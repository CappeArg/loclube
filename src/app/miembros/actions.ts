// src/app/miembros/actions.ts
'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function deleteMiembro(id: number) {
  const supabase = await createSupabaseServerClient();
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
