// src/app/instalaciones/actions.ts
'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function deleteInstalacion(id: number) {
  const supabase = await createSupabaseServerClient();
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
