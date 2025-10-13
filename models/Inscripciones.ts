import { Miembros } from './Miembros';
import { Actividades } from './Actividades';

export class Inscripciones {
    ID_Inscripcion: number;
    miembro: Miembros;
    actividad: Actividades;
    Fecha_Inscripcion: Date;
    Estado: string | null;

    constructor(
        ID_Inscripcion: number,
        miembro: Miembros,
        actividad: Actividades,
        Fecha_Inscripcion: Date,
        Estado: string | null
    ) {
        this.ID_Inscripcion = ID_Inscripcion;
        this.miembro = miembro;
        this.actividad = actividad;
        this.Fecha_Inscripcion = Fecha_Inscripcion;
        this.Estado = Estado;
    }
}
