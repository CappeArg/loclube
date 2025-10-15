// src/app/tipos-de-membresia/[id]/DeleteTipoDeMembresiaButton.tsx
'use client';

import { deleteTipoDeMembresia } from '../actions';

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
