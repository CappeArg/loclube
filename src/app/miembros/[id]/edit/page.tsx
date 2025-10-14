// src/app/miembros/[id]/edit/page.tsx
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Tables } from '../../../../../supabase';

async function getMember(id: string): Promise<Tables<'miembros'> | null> {
  const { data, error } = await supabase
    .from('miembros')
    .select('*')
    .eq('id_miembro', parseInt(id, 10))
    .single();

  if (error) {
    console.error('Error fetching member details:', error);
    return null;
  }
  return data;
}

export default async function EditMemberPage({ params }: { params: { id: string } }) {
  const member = await getMember(params.id);

  if (!member) {
    return <div>Miembro no encontrado</div>;
  }

  async function updateMember(formData: FormData) {
    'use server';

    const updatedMember = {
      nombre: formData.get('nombre') as string,
      apellido: formData.get('apellido') as string,
      email: formData.get('email') as string,
      dni_cedula: formData.get('dni_cedula') as string,
      telefono: formData.get('telefono') as string,
      direccion: formData.get('direccion') as string,
      fecha_nacimiento: formData.get('fecha_nacimiento') as string,
    };

    const { error } = await supabase
      .from('miembros')
      .update(updatedMember)
      .eq('id_miembro', parseInt(params.id, 10));

    if (error) {
      console.error('Error updating member:', error);
      // Handle error
      return;
    }

    revalidatePath(`/miembros/${params.id}`);
    revalidatePath('/miembros');
    redirect(`/miembros/${params.id}`);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Miembro</h1>
      <form action={updateMember} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            defaultValue={member.nombre}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
            Apellido
          </label>
          <input
            id="apellido"
            name="apellido"
            type="text"
            defaultValue={member.apellido}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={member.email}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dni_cedula">
            DNI/Cédula
          </label>
          <input
            id="dni_cedula"
            name="dni_cedula"
            type="text"
            defaultValue={member.dni_cedula || ''}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
            Teléfono
          </label>
          <input
            id="telefono"
            name="telefono"
            type="text"
            defaultValue={member.telefono || ''}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="direccion">
            Dirección
          </label>
          <input
            id="direccion"
            name="direccion"
            type="text"
            defaultValue={member.direccion || ''}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_nacimiento">
            Fecha de Nacimiento
          </label>
          <input
            id="fecha_nacimiento"
            name="fecha_nacimiento"
            type="date"
            defaultValue={member.fecha_nacimiento || ''}
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
