// src/app/actividades/page.tsx
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Tables } from '../../../supabase';

async function getActividades() {
  const { data, error } = await supabase.from('actividades').select('*');
  if (error) {
    console.error('Error fetching actividades:', error);
    return [];
  }
  return data;
}

export default async function ActividadesPage() {
  const actividades: Tables<'actividades'>[] = await getActividades();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Actividades</h1>
      <div className="mb-4">
        <Link href="/actividades/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Agregar Actividad
        </Link>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Descripción</th>
            <th className="py-2 px-4 border-b">Cupo Máximo</th>
            <th className="py-2 px-4 border-b">Costo Adicional</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {actividades.map((actividad) => (
            <tr key={actividad.id_actividad}>
              <td className="py-2 px-4 border-b">{actividad.nombre}</td>
              <td className="py-2 px-4 border-b">{actividad.descripcion}</td>
              <td className="py-2 px-4 border-b">{actividad.cupo_maximo}</td>
              <td className="py-2 px-4 border-b">{actividad.costo_adicional}</td>
              <td className="py-2 px-4 border-b">
                <Link href={`/actividades/${actividad.id_actividad}`} className="text-blue-500 hover:underline mr-2">
                  Ver
                </Link>
                <Link href={`/actividades/${actividad.id_actividad}/edit`} className="text-blue-500 hover:underline">
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
