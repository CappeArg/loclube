// src/app/miembros/actions.ts
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

export async function deleteMiembro(id: number) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from('miembros')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id_miembro', id);

  if (error) {
    console.error('Error deleting miembro:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/miembros');
  return { success: true };
}
