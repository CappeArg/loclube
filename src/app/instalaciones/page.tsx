// src/app/instalaciones/page.tsx
import InstalacionesClient from './client-page';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Tables } from '../../../supabase';

async function getInstalaciones(): Promise<Tables<'instalaciones'>[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('instalaciones')
    .select('*')
    .is('deleted_at', null);

  if (error) {
    console.error('Error fetching instalaciones:', error);
    return [];
  }
  return data;
}

export default async function InstalacionesPage() {
  const instalaciones = await getInstalaciones();
  return <InstalacionesClient instalaciones={instalaciones} />;
}
