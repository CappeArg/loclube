export class Tipos_de_Membresia {
    ID_Tipo_Membresia: number;
    Nombre_Plan: string;
    Descripcion: string | null;
    Precio: number;
    Frecuencia_Pago: string | null;

    constructor(
        ID_Tipo_Membresia: number,
        Nombre_Plan: string,
        Descripcion: string | null,
        Precio: number,
        Frecuencia_Pago: string | null
    ) {
        this.ID_Tipo_Membresia = ID_Tipo_Membresia;
        this.Nombre_Plan = Nombre_Plan;
        this.Descripcion = Descripcion;
        this.Precio = Precio;
        this.Frecuencia_Pago = Frecuencia_Pago;
    }
}
