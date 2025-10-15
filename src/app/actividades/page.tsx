// src/app/actividades/page.tsx
import ActividadesClient from './client-page';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Tables } from '../../../supabase';

async function getActividades(): Promise<Tables<'actividades'>[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('actividades')
    .select('*')
    .is('deleted_at', null);

  if (error) {
    console.error('Error fetching actividades:', error);
    return [];
  }
  return data;
}

export default async function ActividadesPage() {
  const actividades = await getActividades();
  return <ActividadesClient actividades={actividades} />;
}
