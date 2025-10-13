import { Instalaciones } from './Instalaciones';
import { Miembros } from './Miembros';

export class Reservas {
    ID_Reserva: number;
    instalacion: Instalaciones;
    miembro: Miembros;
    Fecha: Date;
    Hora_Inicio: string;
    Hora_Fin: string;
    Estado: string | null;

    constructor(
        ID_Reserva: number,
        instalacion: Instalaciones,
        miembro: Miembros,
        Fecha: Date,
        Hora_Inicio: string,
        Hora_Fin: string,
        Estado: string | null
    ) {
        this.ID_Reserva = ID_Reserva;
        this.instalacion = instalacion;
        this.miembro = miembro;
        this.Fecha = Fecha;
        this.Hora_Inicio = Hora_Inicio;
        this.Hora_Fin = Hora_Fin;
        this.Estado = Estado;
    }
}
