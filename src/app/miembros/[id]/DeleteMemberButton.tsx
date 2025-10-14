// src/app/miembros/[id]/DeleteMemberButton.tsx
'use client';

import { deleteMember } from '../actions';

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
