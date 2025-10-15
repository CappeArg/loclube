"use client";

import { supabase } from "@/lib/supabaseClient";
import { Tables } from "../../supabase";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { session } = useAuth();
  const router = useRouter();
  const [miembros, setMiembros] = useState<Tables<'miembros'>[]>([]);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      const getMiembros = async () => {
        const { data } = await supabase.from('miembros').select();
        if (data) {
          setMiembros(data);
        }
      };
      getMiembros();
    }
  }, [session, router]);

  if (!session) {
    return null; // O un spinner de carga
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Miembros del Club</h1>
        <ul className="list-disc pl-5">
          {miembros?.map((miembro) => (
            <li key={miembro.id_miembro} className="text-lg">
              {miembro.nombre} {miembro.apellido}
            </li>
          ))}
        </ul>
        <button
          onClick={() => supabase.auth.signOut()}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://supabase.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Supabase
export default function Home() {
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
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </header>

      {/* Hero Section */}
      <main className="text-center py-20 px-6">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Bienvenido a tu comunidad</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Descubre un lugar donde puedes conectar, crecer y disfrutar de actividades exclusivas.
        </p>
        <a href="#" className="bg-gray-800 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-700 transition-colors">
          Únete ahora
        </a>
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
