// src/app/personal/actions.ts
'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function deletePersonal(id: number) {
  const supabase = await createSupabaseServerClient();
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
