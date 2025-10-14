// src/app/miembros/actions.ts
'use server';

import { supabase } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteMember(id: number) {
  const { error } = await supabase.from('miembros').delete().eq('id_miembro', id);

  if (error) {
    console.error('Error deleting member:', error);
    // Handle error
    return;
  }

  revalidatePath('/miembros');
  redirect('/miembros');
}
