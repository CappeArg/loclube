// src/app/actividades/actions.ts
'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function deleteActividad(id: number) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from('actividades')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id_actividad', id);

  if (error) {
    console.error('Error deleting actividad:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/actividades');
  return { success: true };
}
