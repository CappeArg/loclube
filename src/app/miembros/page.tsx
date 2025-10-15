// src/app/miembros/page.tsx
import MiembrosClient from './client-page';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Tables } from '../../../supabase';

async function getMiembros(): Promise<Tables<'miembros'>[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('miembros')
    .select('*')
    .is('deleted_at', null);

  if (error) {
    console.error('Error fetching miembros:', error);
    return [];
  }
  return data;
}

export default async function MiembrosPage() {
  const miembros = await getMiembros();
  return <MiembrosClient miembros={miembros} />;
}
