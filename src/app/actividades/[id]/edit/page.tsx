// src/app/actividades/[id]/edit/page.tsx
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Tables } from '../../../../../supabase';

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

export default async function EditActividadPage({ params }: { params: { id: string } }) {
  const actividad = await getActividad(params.id);

  if (!actividad) {
    return <div>Actividad no encontrada</div>;
  }

  async function updateActividad(formData: FormData) {
    'use server';

    const updatedActividad = {
      nombre: formData.get('nombre') as string,
      descripcion: formData.get('descripcion') as string,
      cupo_maximo: Number(formData.get('cupo_maximo')),
      costo_adicional: Number(formData.get('costo_adicional')),
      id_instalacion: Number(formData.get('id_instalacion')),
      id_instructor: Number(formData.get('id_instructor')),
    };

    const { error } = await supabase
      .from('actividades')
      .update(updatedActividad)
      .eq('id_actividad', params.id);

    if (error) {
      console.error('Error updatingividad:', error);
      // Handle error
      return;
    }

    revalidatePath(`/actividades/${params.id}`);
    revalidatePath('/actividades');
    redirect(`/actividades/${params.id}`);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Actividad</h1>
      <form action={updateActividad} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            defaultValue={actividad.nombre}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            defaultValue={actividad.descripcion || ''}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cupo_maximo">
            Cupo Máximo
          </label>
          <input
            id="cupo_maximo"
            name="cupo_maximo"
            type="number"
            defaultValue={actividad.cupo_maximo || ''}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="costo_adicional">
            Costo Adicional
          </label>
          <input
            id="costo_adicional"
            name="costo_adicional"
            type="number"
            step="0.01"
            defaultValue={actividad.costo_adicional || ''}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_instalacion">
            ID Instalación
          </label>
          <input
            id="id_instalacion"
            name="id_instalacion"
            type="number"
            defaultValue={actividad.id_instalacion || ''}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_instructor">
            ID Instructor
          </label>
          <input
            id="id_instructor"
            name="id_instructor"
            type="number"
            defaultValue={actividad.id_instructor || ''}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}
