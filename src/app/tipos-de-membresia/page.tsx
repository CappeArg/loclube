// src/app/tipos-de-membresia/page.tsx
import TiposDeMembresiaClient from './client-page';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Tables } from '../../../supabase';

async function getTiposDeMembresia(): Promise<Tables<'tipos_de_membresia'>[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('tipos_de_membresia')
    .select('*')
    .is('deleted_at', null);

  if (error) {
    console.error('Error fetching tipos de membresia:', error);
    return [];
  }
  return data;
}

export default async function TiposDeMembresiaPage() {
  const tiposDeMembresia = await getTiposDeMembresia();
  return <TiposDeMembresiaClient tiposDeMembresia={tiposDeMembresia} />;
}
