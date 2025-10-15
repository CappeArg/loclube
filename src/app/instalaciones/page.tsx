// src/app/instalaciones/page.tsx
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Tables } from '../../../supabase';

async function getInstalaciones() {
  const { data, error } = await supabase.from('instalaciones').select('*');
  if (error) {
    console.error('Error fetching instalaciones:', error);
    return [];
  }
  return data;
}

export default async function InstalacionesPage() {
  const instalaciones: Tables<'instalaciones'>[] = await getInstalaciones();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Instalaciones</h1>
      <div className="mb-4">
        <Link href="/instalaciones/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Agregar Instalación
        </Link>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Tipo</th>
            <th className="py-2 px-4 border-b">Estado</th>
            <th className="py-2 px-4 border-b">Capacidad</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {instalaciones.map((instalacion) => (
            <tr key={instalacion.id_instalacion}>
              <td className="py-2 px-4 border-b">{instalacion.nombre}</td>
              <td className="py-2 px-4 border-b">{instalacion.tipo}</td>
              <td className="py-2 px-4 border-b">{instalacion.estado}</td>
              <td className="py-2 px-4 border-b">{instalacion.capacidad}</td>
              <td className="py-2 px-4 border-b">
                <Link href={`/instalaciones/${instalacion.id_instalacion}`} className="text-blue-500 hover:underline mr-2">
                  Ver
                </Link>
                <Link href={`/instalaciones/${instalacion.id_instalacion}/edit`} className="text-blue-500 hover:underline">
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
