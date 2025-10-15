// src/app/tipos-de-membresia/[id]/DeleteTipoDeMembresiaButton.tsx
'use client';

import { supabase } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function deleteTipoDeMembresia(id: number) {
  'use server';

  const { error } = await supabase.from('tipos_de_membresia').delete().eq('id_tipo_membresia', id);

  if (error) {
    console.error('Error deleting tipo de membresia:', error);
    // Handle error
    return;
  }

  revalidatePath('/tipos-de-membresia');
  redirect('/tipos-de-membresia');
}

export default function DeleteTipoDeMembresiaButton({ tipoDeMembresiaId }: { tipoDeMembresiaId: number }) {
  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este tipo de membresía?')) {
      await deleteTipoDeMembresia(tipoDeMembresiaId);
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
