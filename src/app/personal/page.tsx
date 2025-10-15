// src/app/personal/page.tsx
import PersonalClient from './client-page';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Tables } from '../../../supabase';

async function getPersonal(): Promise<Tables<'personal'>[]> {
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
    .from('personal')
    .select('*')
    .is('deleted_at', null);

  if (error) {
    console.error('Error fetching personal:', error);
    return [];
  }
  return data;
}

export default async function PersonalPage() {
  const personal = await getPersonal();
  return <PersonalClient personal={personal} />;
}
