// src/app/instalaciones/actions.ts
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

export async function deleteInstalacion(id: number) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from('instalaciones')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id_instalacion', id);

  if (error) {
    console.error('Error deleting instalacion:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/instalaciones');
  return { success: true };
}
