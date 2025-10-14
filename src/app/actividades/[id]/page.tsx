// src/app/actividades/[id]/page.tsx
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Tables } from '../../../../supabase';
import DeleteActividadButton from './DeleteActividadButton';

async function getActividad(id: string): Promise<Tables<'actividades'> | null> {
  const { data, error } = await supabase
    .from('actividades')
    .select('*')
    .eq('id_actividad', id)
    .single();

  if (error) {
    console.error('Error fetching actividad details:', error);
    return null;
  }
  return data;
}

export default async function ActividadDetailsPage({ params }: { params: { id: string } }) {
  const actividad = await getActividad(params.id);

  if (!actividad) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Actividad no encontrada</h1>
        <Link href="/actividades" className="text-blue-500 hover:underline">
          Volver a la lista de actividades
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Detalles de la Actividad</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <strong>Nombre:</strong> {actividad.nombre}
        </div>
        <div className="mb-4">
          <strong>Descripción:</strong> {actividad.descripcion}
        </div>
        <div className="mb-4">
          <strong>Cupo Máximo:</strong> {actividad.cupo_maximo}
        </div>
        <div className="mb-4">
          <strong>Costo Adicional:</strong> {actividad.costo_adicional}
        </div>
        <div className="mb-4">
          <strong>Instalación ID:</strong> {actividad.id_instalacion}
        </div>
        <div className="mb-4">
          <strong>Instructor ID:</strong> {actividad.id_instructor}
        </div>
        <div className="flex items-center justify-between mt-6">
          <Link href={`/actividades/${actividad.id_actividad}/edit`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Editar
          </Link>
          <DeleteActividadButton actividadId={actividad.id_actividad} />
          <Link href="/actividades" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
}
