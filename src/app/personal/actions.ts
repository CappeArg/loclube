// src/app/personal/actions.ts
'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

function createSupabaseServerClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    },
  );
}

export async function deletePersonal(id: number) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from('personal')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id_personal', id);

  if (error) {
    console.error('Error deleting personal:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/personal');
  return { success: true };
}
