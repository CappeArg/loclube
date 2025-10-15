// src/app/instalaciones/[id]/page.tsx
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Tables } from '../../../../supabase';
import DeleteInstalacionButton from './DeleteInstalacionButton';

async function getInstalacion(id: string): Promise<Tables<'instalaciones'> | null> {
  const { data, error } = await supabase
    .from('instalaciones')
    .select('*')
    .eq('id_instalacion', Number(id))
    .single();

  if (error) {
    console.error('Error fetching instalacion details:', error);
    return null;
  }
  return data;
}

export default async function InstalacionDetailsPage({ params }: { params: { id: string } }) {
  const instalacion = await getInstalacion(params.id);

  if (!instalacion) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Instalación no encontrada</h1>
        <Link href="/instalaciones" className="text-blue-500 hover:underline">
          Volver a la lista de instalaciones
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Detalles de la Instalación</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <strong>Nombre:</strong> {instalacion.nombre}
        </div>
        <div className="mb-4">
          <strong>Tipo:</strong> {instalacion.tipo}
        </div>
        <div className="mb-4">
          <strong>Estado:</strong> {instalacion.estado}
        </div>
        <div className="mb-4">
          <strong>Capacidad:</strong> {instalacion.capacidad}
        </div>
        <div className="flex items-center justify-between mt-6">
          <Link href={`/instalaciones/${instalacion.id_instalacion}/edit`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Editar
          </Link>
          <DeleteInstalacionButton instalacionId={instalacion.id_instalacion} />
          <Link href="/instalaciones" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
}
