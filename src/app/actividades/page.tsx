// src/app/actividades/page.tsx
import ActividadesClient from './client-page';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Tables } from '../../../supabase';

async function getActividades(): Promise<Tables<'actividades'>[]> {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    },
  );

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
