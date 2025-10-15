// src/app/tipos-de-membresia/new/page.tsx
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function NewTipoDeMembresiaPage() {

  async function addTipoDeMembresia(formData: FormData) {
    'use server';

    const newTipoDeMembresia = {
      nombre_plan: formData.get('nombre_plan') as string,
      descripcion: formData.get('descripcion') as string,
      precio: Number(formData.get('precio')),
      frecuencia_pago: formData.get('frecuencia_pago') as string,
    };

    const { error } = await supabase.from('tipos_de_membresia').insert(newTipoDeMembresia);

    if (error) {
      console.error('Error adding tipo de membresia:', error);
      // Handle error
      return;
    }

    revalidatePath('/tipos-de-membresia');
    redirect('/tipos-de-membresia');
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Agregar Nuevo Tipo de Membresía</h1>
      <form action={addTipoDeMembresia} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre_plan">
            Nombre del Plan
          </label>
          <input
            id="nombre_plan"
            name="nombre_plan"
            type="text"
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
