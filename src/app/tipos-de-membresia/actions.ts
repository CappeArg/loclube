// src/app/tipos-de-membresia/actions.ts
'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function deleteTipoDeMembresia(id: number) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from('tipos_de_membresia')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id_tipo_membresia', id);

  if (error) {
    console.error('Error deleting tipo de membresia:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/tipos-de-membresia');
  return { success: true };
}
