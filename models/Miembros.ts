import { Tipos_de_Membresia } from './Tipos_de_Membresia';

export class Miembros {
    ID_Miembro: number;
    Nombre: string;
    Apellido: string;
    DNI_Cedula: string | null;
    Fecha_Nacimiento: Date | null;
    Email: string;
    Telefono: string | null;
    Direccion: string | null;
    Fecha_Alta: Date;
    Estado: string | null;
    tipo_membresia: Tipos_de_Membresia | null;

    constructor(
        ID_Miembro: number,
        Nombre: string,
        Apellido: string,
        DNI_Cedula: string | null,
        Fecha_Nacimiento: Date | null,
        Email: string,
        Telefono: string | null,
        Direccion: string | null,
        Fecha_Alta: Date,
        Estado: string | null,
        tipo_membresia: Tipos_de_Membresia | null
    ) {
        this.ID_Miembro = ID_Miembro;
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.DNI_Cedula = DNI_Cedula;
        this.Fecha_Nacimiento = Fecha_Nacimiento;
        this.Email = Email;
        this.Telefono = Telefono;
        this.Direccion = Direccion;
        this.Fecha_Alta = Fecha_Alta;
        this.Estado = Estado;
        this.tipo_membresia = tipo_membresia;
    }
}
