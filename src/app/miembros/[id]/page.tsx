// src/app/miembros/[id]/page.tsx
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Tables } from '../../../../supabase';
import DeleteMemberButton from './DeleteMemberButton';

async function getMember(id: string): Promise<Tables<'miembros'> | null> {
  const { data, error } = await supabase
    .from('miembros')
    .select('*')
    .eq('id_miembro', parseInt(id, 10))
    .single();

  if (error) {
    console.error('Error fetching member details:', error);
    return null;
  }
  return data;
}

export default async function MemberDetailsPage({ params }: { params: { id: string } }) {
  const member = await getMember(params.id);

  if (!member) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Miembro no encontrado</h1>
        <Link href="/miembros" className="text-blue-500 hover:underline">
          Volver a la lista de miembros
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Detalles del Miembro</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <strong>Nombre:</strong> {member.nombre}
        </div>
        <div className="mb-4">
          <strong>Apellido:</strong> {member.apellido}
        </div>
        <div className="mb-4">
          <strong>Email:</strong> {member.email}
        </div>
        <div className="mb-4">
          <strong>DNI/Cédula:</strong> {member.dni_cedula}
        </div>
        <div className="mb-4">
          <strong>Teléfono:</strong> {member.telefono}
        </div>
        <div className="mb-4">
          <strong>Dirección:</strong> {member.direccion}
        </div>
        <div className="mb-4">
          <strong>Fecha de Nacimiento:</strong> {member.fecha_nacimiento}
        </div>
        <div className="mb-4">
          <strong>Fecha de Alta:</strong> {member.fecha_alta}
        </div>
        <div className="mb-4">
          <strong>Tipo de Membresía ID:</strong> {member.id_tipo_membresia}
        </div>
        <div className="flex items-center justify-between mt-6">
          <Link href={`/miembros/${member.id_miembro}/edit`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Editar
          </Link>
          <DeleteMemberButton memberId={member.id_miembro} />
          <Link href="/miembros" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
}
