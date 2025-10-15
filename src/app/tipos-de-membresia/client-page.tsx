"use client";
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { deleteTipoDeMembresia } from './actions';
import { Tables } from '../../../supabase';

interface TiposDeMembresiaPageProps {
  tiposDeMembresia: Tables<'tipos_de_membresia'>[];
}

export default function TiposDeMembresiaClient({ tiposDeMembresia }: TiposDeMembresiaPageProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm) return tiposDeMembresia;
    return tiposDeMembresia.filter(tipo =>
      tipo.nombre_plan.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, tiposDeMembresia]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tipos de Membresía</h1>
        <Button asChild>
          <Link href="/tipos-de-membresia/new">Agregar Tipo de Membresía</Link>
        </Button>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Buscar por nombre del plan..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre del Plan</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Frecuencia de Pago</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((tipo) => (
              <TableRow key={tipo.id_tipo_membresia}>
                <TableCell>{tipo.nombre_plan}</TableCell>
                <TableCell>{tipo.precio}</TableCell>
                <TableCell>{tipo.frecuencia_pago}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/tipos-de-membresia/${tipo.id_tipo_membresia}/edit`}>Editar</Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                        Eliminar
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción marcará el tipo de membresía como inactivo, pero no lo eliminará permanentemente.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteTipoDeMembresia(tipo.id_tipo_membresia)}>
                          Confirmar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
