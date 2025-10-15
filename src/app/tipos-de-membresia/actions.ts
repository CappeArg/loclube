// src/app/tipos-de-membresia/actions.ts
'use server';

import { supabase } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteTipoDeMembresia(id: number) {
  const { error } = await supabase.from('tipos_de_membresia').delete().eq('id_tipo_membresia', id);

  if (error) {
    console.error('Error deleting tipo de membresia:', error);
    // Handle error
    return;
  }

  revalidatePath('/tipos-de-membresia');
  redirect('/tipos-de-membresia');
}
