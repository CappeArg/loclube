// src/app/instalaciones/[id]/DeleteInstalacionButton.tsx
'use client';

import { deleteInstalacion } from '../actions';

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
