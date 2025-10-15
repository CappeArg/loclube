import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function getEntityCount(tableName: string): Promise<number> {
  const supabase = await createSupabaseServerClient();
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
