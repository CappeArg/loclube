// src/app/actividades/[id]/DeleteActividadButton.tsx
'use client';

import { deleteActividad } from '../actions';

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
