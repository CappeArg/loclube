export class Instalaciones {
    ID_Instalacion: number;
    Nombre: string;
    Tipo: string | null;
    Capacidad: number | null;
    Estado: string | null;

    constructor(
        ID_Instalacion: number,
        Nombre: string,
        Tipo: string | null,
        Capacidad: number | null,
        Estado: string | null
    ) {
        this.ID_Instalacion = ID_Instalacion;
        this.Nombre = Nombre;
        this.Tipo = Tipo;
        this.Capacidad = Capacidad;
        this.Estado = Estado;
    }
}
