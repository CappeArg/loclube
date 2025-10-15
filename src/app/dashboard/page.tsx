import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Users, Building, Dumbbell, UserCog, BadgeInfo } from "lucide-react";
import { getEntityCount } from "@/lib/data";

const DashboardPage = async () => {
  const stats = [
    { title: "Miembros", entity: "miembros", icon: <Users className="h-4 w-4 text-muted-foreground" />, href: "/miembros" },
    { title: "Instalaciones", entity: "instalaciones", icon: <Building className="h-4 w-4 text-muted-foreground" />, href: "/instalaciones" },
    { title: "Actividades", entity: "actividades", icon: <Dumbbell className="h-4 w-4 text-muted-foreground" />, href: "/actividades" },
    { title: "Personal", entity: "personal", icon: <UserCog className="h-4 w-4 text-muted-foreground" />, href: "/personal" },
    { title: "Tipos de Membresía", entity: "tipos_de_membresia", icon: <BadgeInfo className="h-4 w-4 text-muted-foreground" />, href: "/tipos-de-membresia" },
  ];

  const counts = await Promise.all(
    stats.map(stat => getEntityCount(stat.entity))
  );

  const statsWithCounts = stats.map((stat, index) => ({
    ...stat,
    count: counts[index],
  }));

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statsWithCounts.map((stat) => (
          <Link href={stat.href} key={stat.title}>
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.count}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
