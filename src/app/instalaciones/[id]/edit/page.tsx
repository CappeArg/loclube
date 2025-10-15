// src/app/instalaciones/[id]/edit/page.tsx
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Tables } from '../../../../../supabase';

async function getInstalacion(id: string): Promise<Tables<'instalaciones'> | null> {
  const { data, error } = await supabase
    .from('instalaciones')
    .select('*')
    .eq('id_instalacion', id)
    .single();

  if (error) {
    console.error('Error fetching instalacion details:', error);
    return null;
  }
  return data;
}

export default async function EditInstalacionPage({ params }: { params: { id: string } }) {
  const instalacion = await getInstalacion(params.id);

  if (!instalacion) {
    return <div>Instalación no encontrada</div>;
  }

  async function updateInstalacion(formData: FormData) {
    'use server';

    const updatedInstalacion = {
      nombre: formData.get('nombre') as string,
      tipo: formData.get('tipo') as string,
      estado: formData.get('estado') as string,
      capacidad: Number(formData.get('capacidad')),
    };

    const { error } = await supabase
      .from('instalaciones')
      .update(updatedInstalacion)
      .eq('id_instalacion', params.id);

    if (error) {
      console.error('Error updating instalacion:', error);
      // Handle error
      return;
    }

    revalidatePath(`/instalaciones/${params.id}`);
    revalidatePath('/instalaciones');
    redirect(`/instalaciones/${params.id}`);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Instalación</h1>
      <form action={updateInstalacion} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            defaultValue={instalacion.nombre}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tipo">
            Tipo
          </label>
          <input
            id="tipo"
            name="tipo"
            type="text"
            defaultValue={instalacion.tipo || ''}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">
            Estado
          </label>
          <input
            id="estado"
            name="estado"
            type="text"
            defaultValue={instalacion.estado || ''}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="capacidad">
            Capacidad
          </label>
          <input
            id="capacidad"
            name="capacidad"
            type="number"
            defaultValue={instalacion.capacidad || ''}
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
