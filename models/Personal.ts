export class Personal {
    ID_Personal: number;
    Nombre: string;
    Apellido: string;
    Puesto: string | null;
    Email: string | null;
    Telefono: string | null;

    constructor(
        ID_Personal: number,
        Nombre: string,
        Apellido: string,
        Puesto: string | null,
        Email: string | null,
        Telefono: string | null
    ) {
        this.ID_Personal = ID_Personal;
        this.Nombre = Nombre;
        this.Apellido = Apellido;
        this.Puesto = Puesto;
        this.Email = Email;
        this.Telefono = Telefono;
    }
}
