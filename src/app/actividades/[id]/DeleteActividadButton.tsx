// src/app/actividades/[id]/DeleteActividadButton.tsx
'use client';

import { supabase } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function deleteActividad(id: number) {
  'use server';

  const { error } = await supabase.from('actividades').delete().eq('id_actividad', id);

  if (error) {
    console.error('Error deleting actividad:', error);
    // Handle error
    return;
  }

  revalidatePath('/actividades');
  redirect('/actividades');
}

export default function DeleteActividadButton({ actividadId }: { actividadId: number }) {
  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta actividad?')) {
      await deleteActividad(actividadId);
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
