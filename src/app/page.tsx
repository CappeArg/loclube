import { supabase } from "@/lib/supabaseClient";
import { Tables } from "../../supabase";

export default async function Home() {
  const { data: miembros } = await supabase.from('miembros').select();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Miembros del Club</h1>
        <ul className="list-disc pl-5">
          {miembros?.map((miembro: Tables<'miembros'>) => (
            <li key={miembro.id_miembro} className="text-lg">
              {miembro.nombre} {miembro.apellido}
            </li>
          ))}
        </ul>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://supabase.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Supabase
        </a>
      </footer>
    </div>
  );
}
