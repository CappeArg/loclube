// src/app/tipos-de-membresia/page.tsx
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Tables } from '../../../supabase';

async function getTiposDeMembresia() {
  const { data, error } = await supabase.from('tipos_de_membresia').select('*');
  if (error) {
    console.error('Error fetching tipos de membresia:', error);
    return [];
  }
  return data;
}

export default async function TiposDeMembresiaPage() {
  const tiposDeMembresia: Tables<'tipos_de_membresia'>[] = await getTiposDeMembresia();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tipos de Membresía</h1>
      <div className="mb-4">
        <Link href="/tipos-de-membresia/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Agregar Tipo de Membresía
        </Link>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombre del Plan</th>
            <th className="py-2 px-4 border-b">Precio</th>
            <th className="py-2 px-4 border-b">Frecuencia de Pago</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tiposDeMembresia.map((tipo) => (
            <tr key={tipo.id_tipo_membresia}>
              <td className="py-2 px-4 border-b">{tipo.nombre_plan}</td>
              <td className="py-2 px-4 border-b">{tipo.precio}</td>
              <td className="py-2 px-4 border-b">{tipo.frecuencia_pago}</td>
              <td className="py-2 px-4 border-b">
                <Link href={`/tipos-de-membresia/${tipo.id_tipo_membresia}`} className="text-blue-500 hover:underline mr-2">
                  Ver
                </Link>
                <Link href={`/tipos-de-membresia/${tipo.id_tipo_membresia}/edit`} className="text-blue-500 hover:underline">
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
