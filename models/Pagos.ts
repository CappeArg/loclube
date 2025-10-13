import { Miembros } from './Miembros';

export class Pagos {
    ID_Pago: number;
    miembro: Miembros;
    Monto: number;
    Fecha_Pago: Date;
    Concepto: string | null;
    Metodo_Pago: string | null;
    Estado: string | null;

    constructor(
        ID_Pago: number,
        miembro: Miembros,
        Monto: number,
        Fecha_Pago: Date,
        Concepto: string | null,
        Metodo_Pago: string | null,
        Estado: string | null
    ) {
        this.ID_Pago = ID_Pago;
        this.miembro = miembro;
        this.Monto = Monto;
        this.Fecha_Pago = Fecha_Pago;
        this.Concepto = Concepto;
        this.Metodo_Pago = Metodo_Pago;
        this.Estado = Estado;
    }
}
