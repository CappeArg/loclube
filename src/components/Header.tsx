import Link from 'next/link';

export const Header = () => {
  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/miembros', label: 'Miembros' },
    { href: '/actividades', label: 'Actividades' },
    { href: '/instalaciones', label: 'Instalaciones' },
    { href: '/personal', label: 'Personal' },
    { href: '/tipos-de-membresia', label: 'Tipos de Membresía' },
  ];

  return (
    <header className="bg-background border-b">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-xl font-bold">
              ClubManager
            </Link>
          </div>
          <div className="hidden sm:flex sm:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};
