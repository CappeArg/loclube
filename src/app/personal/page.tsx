// src/app/personal/page.tsx
import PersonalClient from './client-page';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Tables } from '../../../supabase';

async function getPersonal(): Promise<Tables<'personal'>[]> {
  const supabase = await createSupabaseServerClient();

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
