// src/app/instalaciones/actions.ts
'use server';

import { supabase } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteInstalacion(id: number) {
  const { error } = await supabase.from('instalaciones').delete().eq('id_instalacion', id);

  if (error) {
    console.error('Error deleting instalacion:', error);
    // Handle error
    return;
  }

  revalidatePath('/instalaciones');
  redirect('/instalaciones');
}
