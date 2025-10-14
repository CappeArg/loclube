// src/app/miembros/[id]/DeleteMemberButton.tsx
'use client';

import { supabase } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function deleteMember(id: number) {
  'use server';

  const { error } = await supabase.from('miembros').delete().eq('id_miembro', id);

  if (error) {
    console.error('Error deleting member:', error);
    // Handle error
    return;
  }

  revalidatePath('/miembros');
  redirect('/miembros');
}

export default function DeleteMemberButton({ memberId }: { memberId: number }) {
  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este miembro?')) {
      await deleteMember(memberId);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Eliminar
    </button>
  );
}
