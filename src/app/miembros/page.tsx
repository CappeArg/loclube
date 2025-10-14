// src/app/miembros/page.tsx
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Tables } from '../../../supabase';

async function getMembers() {
  const { data, error } = await supabase.from('miembros').select('*');
  if (error) {
    console.error('Error fetching members:', error);
    return [];
  }
  return data;
}

export default async function MembersPage() {
  const members: Tables<'miembros'>[] = await getMembers();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Miembros</h1>
      <div className="mb-4">
        <Link href="/miembros/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Agregar Miembro
        </Link>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Apellido</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id_miembro}>
              <td className="py-2 px-4 border-b">{member.nombre}</td>
              <td className="py-2 px-4 border-b">{member.apellido}</td>
              <td className="py-2 px-4 border-b">{member.email}</td>
              <td className="py-2 px-4 border-b">
                <Link href={`/miembros/${member.id_miembro}`} className="text-blue-500 hover:underline mr-2">
                  Ver
                </Link>
                <Link href={`/miembros/${member.id_miembro}/edit`} className="text-blue-500 hover:underline">
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
