import { supabase } from "@/lib/supabaseClient";
import { Tables } from "../../supabase";

export default async function Home() {
  const { data: miembros } = await supabase.from('miembros').select();

  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Mi Club</h1>
        <nav className="hidden md:flex gap-6 text-gray-600">
          <a href="#" className="hover:text-gray-900">Inicio</a>
          <a href="#" className="hover:text-gray-900">Actividades</a>
          <a href="#" className="hover:text-gray-900">Instalaciones</a>
          <a href="#" className="hover:text-gray-900">Contacto</a>
        </nav>
        <button className="md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </header>

      {/* Member List Section */}
      <main className="container mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold mb-8">Miembros del Club</h1>
        <ul className="list-disc pl-5">
          {miembros?.map((miembro: Tables<'miembros'>) => (
            <li key={miembro.id_miembro} className="text-lg">
              {miembro.nombre} {miembro.apellido}
            </li>
          ))}
        </ul>
      </main>

      {/* Footer */}
      <footer className="text-center p-6 border-t border-gray-200 text-gray-500">
        <p>&copy; {new Date().getFullYear()} Mi Club. Todos los derechos reservados.</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="#" className="hover:text-gray-900">Facebook</a>
          <a href="#" className="hover:text-gray-900">Twitter</a>
          <a href="#" className="hover:text-gray-900">Instagram</a>
        </div>
      </footer>
    </div>
  );
}
