import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

function createSupabaseServerClient() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    },
  )
}

export async function getEntityCount(tableName: string): Promise<number> {
  const supabase = createSupabaseServerClient();
  const { count, error } = await supabase
    .from(tableName)
    .select('*', { count: 'exact', head: true })
    .is('deleted_at', null);

  if (error) {
    console.error(`Error fetching count for ${tableName}:`, error);
    return 0;
  }

  return count || 0;
}
