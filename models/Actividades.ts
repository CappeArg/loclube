import { Personal } from './Personal';
import { Instalaciones } from './Instalaciones';

export class Actividades {
    ID_Actividad: number;
    Nombre: string;
    Descripcion: string | null;
    instructor: Personal | null;
    instalacion: Instalaciones | null;
    Cupo_Maximo: number | null;
    Costo_Adicional: number | null;

    constructor(
        ID_Actividad: number,
        Nombre: string,
        Descripcion: string | null,
        instructor: Personal | null,
        instalacion: Instalaciones | null,
        Cupo_Maximo: number | null,
        Costo_Adicional: number | null
    ) {
        this.ID_Actividad = ID_Actividad;
        this.Nombre = Nombre;
        this.Descripcion = Descripcion;
        this.instructor = instructor;
        this.instalacion = instalacion;
        this.Cupo_Maximo = Cupo_Maximo;
        this.Costo_Adicional = Costo_Adicional;
    }
}
