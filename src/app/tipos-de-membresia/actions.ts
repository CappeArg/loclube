// src/app/tipos-de-membresia/actions.ts
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

export async function deleteTipoDeMembresia(id: number) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from('tipos_de_membresia')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id_tipo_membresia', id);

  if (error) {
    console.error('Error deleting tipo de membresia:', error);
    // Aquí podrías devolver un objeto con el error para manejarlo en el cliente si fuera necesario
    return { success: false, error: error.message };
  }

  revalidatePath('/tipos-de-membresia');
  return { success: true };
}
