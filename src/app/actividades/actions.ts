// src/app/actividades/actions.ts
'use server';

import { supabase } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteActividad(id: number) {
  const { error } = await supabase.from('actividades').delete().eq('id_actividad', id);

  if (error) {
    console.error('Error deleting actividad:', error);
    // Handle error
    return;
  }

  revalidatePath('/actividades');
  redirect('/actividades');
}
