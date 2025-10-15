// src/app/tipos-de-membresia/[id]/page.tsx
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Tables } from '../../../../supabase';
import DeleteTipoDeMembresiaButton from './DeleteTipoDeMembresiaButton';

async function getTipoDeMembresia(id: string): Promise<Tables<'tipos_de_membresia'> | null> {
  const { data, error } = await supabase
    .from('tipos_de_membresia')
    .select('*')
    .eq('id_tipo_membresia', parseInt(id, 10))
    .single();

  if (error) {
    console.error('Error fetching tipo de membresia details:', error);
    return null;
  }
  return data;
}

export default async function TipoDeMembresiaDetailsPage({ params }: { params: { id: string } }) {
  const tipoDeMembresia = await getTipoDeMembresia(params.id);

  if (!tipoDeMembresia) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Tipo de Membresía no encontrado</h1>
        <Link href="/tipos-de-membresia" className="text-blue-500 hover:underline">
          Volver a la lista de tipos de membresía
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Detalles del Tipo de Membresía</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <strong>Nombre del Plan:</strong> {tipoDeMembresia.nombre_plan}
        </div>
        <div className="mb-4">
          <strong>Descripción:</strong> {tipoDeMembresia.descripcion}
        </div>
        <div className="mb-4">
          <strong>Precio:</strong> {tipoDeMembresia.precio}
        </div>
        <div className="mb-4">
          <strong>Frecuencia de Pago:</strong> {tipoDeMembresia.frecuencia_pago}
        </div>
        <div className="flex items-center justify-between mt-6">
          <Link href={`/tipos-de-membresia/${tipoDeMembresia.id_tipo_membresia}/edit`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Editar
          </Link>
          <DeleteTipoDeMembresiaButton tipoDeMembresiaId={tipoDeMembresia.id_tipo_membresia} />
          <Link href="/tipos-de-membresia" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
}
