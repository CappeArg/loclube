// src/app/instalaciones/new/page.tsx
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function NewInstalacionPage() {

  async function addInstalacion(formData: FormData) {
    'use server';

    const newInstalacion = {
      nombre: formData.get('nombre') as string,
      tipo: formData.get('tipo') as string,
      estado: formData.get('estado') as string,
      capacidad: Number(formData.get('capacidad')),
    };

    const { error } = await supabase.from('instalaciones').insert(newInstalacion);

    if (error) {
      console.error('Error adding instalacion:', error);
      // Handle error
      return;
    }

    revalidatePath('/instalaciones');
    redirect('/instalaciones');
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Agregar Nueva Instalación</h1>
      <form action={addInstalacion} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
