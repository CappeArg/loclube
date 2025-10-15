// src/app/miembros/page.tsx
import MiembrosClient from './client-page';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Tables } from '../../../supabase';

async function getMiembros(): Promise<Tables<'miembros'>[]> {
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
