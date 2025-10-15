// src/app/tipos-de-membresia/[id]/edit/page.tsx
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Tables } from '../../../../../supabase';

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

export default async function EditTipoDeMembresiaPage({ params }: { params: { id: string } }) {
  const tipoDeMembresia = await getTipoDeMembresia(params.id);

  if (!tipoDeMembresia) {
    return <div>Tipo de Membresía no encontrado</div>;
  }

  async function updateTipoDeMembresia(formData: FormData) {
    'use server';

    const updatedTipoDeMembresia = {
      nombre_plan: formData.get('nombre_plan') as string,
      descripcion: formData.get('descripcion') as string,
      precio: Number(formData.get('precio')),
      frecuencia_pago: formData.get('frecuencia_pago') as string,
    };

    const { error } = await supabase
      .from('tipos_de_membresia')
      .update(updatedTipoDeMembresia)
      .eq('id_tipo_membresia', parseInt(params.id, 10));

    if (error) {
      console.error('Error updating tipo de membresia:', error);
      // Handle error
      return;
    }

    revalidatePath(`/tipos-de-membresia/${params.id}`);
    revalidatePath('/tipos-de-membresia');
    redirect(`/tipos-de-membresia/${params.id}`);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Tipo de Membresía</h1>
      <form action={updateTipoDeMembresia} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre_plan">
            Nombre del Plan
          </label>
          <input
            id="nombre_plan"
            name="nombre_plan"
            type="text"
            defaultValue={tipoDeMembresia.nombre_plan}
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
            defaultValue={tipoDeMembresia.descripcion || ''}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
            Precio
          </label>
          <input
            id="precio"
            name="precio"
            type="number"
            step="0.01"
            defaultValue={tipoDeMembresia.precio}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="frecuencia_pago">
            Frecuencia de Pago
          </label>
          <input
            id="frecuencia_pago"
            name="frecuencia_pago"
            type="text"
            defaultValue={tipoDeMembresia.frecuencia_pago || ''}
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
