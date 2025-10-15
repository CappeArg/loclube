// src/app/instalaciones/page.tsx
import InstalacionesClient from './client-page';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Tables } from '../../../supabase';

async function getInstalaciones(): Promise<Tables<'instalaciones'>[]> {
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
