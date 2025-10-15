// src/app/instalaciones/[id]/DeleteInstalacionButton.tsx
'use client';

import { supabase } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function deleteInstalacion(id: number) {
  'use server';

  const { error } = await supabase.from('instalaciones').delete().eq('id_instalacion', id);

  if (error) {
    console.error('Error deleting instalacion:', error);
    // Handle error
    return;
  }

  revalidatePath('/instalaciones');
  redirect('/instalaciones');
}

export default function DeleteInstalacionButton({ instalacionId }: { instalacionId: number }) {
  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta instalación?')) {
      await deleteInstalacion(instalacionId);
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
