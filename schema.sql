-- =============================================================================
-- Schema for Club Management System
-- =============================================================================
-- This script defines the tables for a comprehensive club management system,
-- including members, memberships, payments, facilities, bookings, activities,
-- and staff.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Table: Tipos_de_Membresia
-- Description: Stores the different types of membership plans available.
-- -----------------------------------------------------------------------------
CREATE TABLE Tipos_de_Membresia (
    ID_Tipo_Membresia SERIAL PRIMARY KEY,
    Nombre_Plan VARCHAR(255) NOT NULL,
    Descripcion TEXT,
    Precio DECIMAL(10, 2) NOT NULL,
    Frecuencia_Pago VARCHAR(50)
);

-- -----------------------------------------------------------------------------
-- Table: Miembros
-- Description: Contains all personal and contact information for club members.
-- -----------------------------------------------------------------------------
CREATE TABLE Miembros (
    ID_Miembro SERIAL PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Apellido VARCHAR(255) NOT NULL,
    DNI_Cedula VARCHAR(50) UNIQUE,
    Fecha_Nacimiento DATE,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Telefono VARCHAR(50),
    Direccion TEXT,
    Fecha_Alta DATE DEFAULT CURRENT_DATE,
    Estado VARCHAR(50),
    ID_Tipo_Membresia INT,
    FOREIGN KEY (ID_Tipo_Membresia) REFERENCES Tipos_de_Membresia(ID_Tipo_Membresia)
);

-- -----------------------------------------------------------------------------
-- Table: Pagos
-- Description: Logs all financial transactions made by members.
-- -----------------------------------------------------------------------------
CREATE TABLE Pagos (
    ID_Pago SERIAL PRIMARY KEY,
    ID_Miembro INT NOT NULL,
    Monto DECIMAL(10, 2) NOT NULL,
    Fecha_Pago TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    Concepto VARCHAR(255),
    Metodo_Pago VARCHAR(50),
    Estado VARCHAR(50),
    FOREIGN KEY (ID_Miembro) REFERENCES Miembros(ID_Miembro)
);

-- -----------------------------------------------------------------------------
-- Table: Instalaciones
-- Description: Catalog of all physical facilities available for booking.
-- -----------------------------------------------------------------------------
CREATE TABLE Instalaciones (
    ID_Instalacion SERIAL PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Tipo VARCHAR(100),
    Capacidad INT,
    Estado VARCHAR(50)
);

-- -----------------------------------------------------------------------------
-- Table: Personal
-- Description: Manages staff and instructors.
-- -----------------------------------------------------------------------------
CREATE TABLE Personal (
    ID_Personal SERIAL PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Apellido VARCHAR(255) NOT NULL,
    Puesto VARCHAR(100),
    Email VARCHAR(255) UNIQUE,
    Telefono VARCHAR(50)
);

-- -----------------------------------------------------------------------------
-- Table: Actividades
-- Description: Defines the classes, courses, or events organized by the club.
-- -----------------------------------------------------------------------------
CREATE TABLE Actividades (
    ID_Actividad SERIAL PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Descripcion TEXT,
    ID_Instructor INT,
    ID_Instalacion INT,
    Cupo_Maximo INT,
    Costo_Adicional DECIMAL(10, 2),
    FOREIGN KEY (ID_Instructor) REFERENCES Personal(ID_Personal),
    FOREIGN KEY (ID_Instalacion) REFERENCES Instalaciones(ID_Instalacion)
);

-- -----------------------------------------------------------------------------
-- Table: Reservas
-- Description: Records the use of facilities by members at specific times.
-- -----------------------------------------------------------------------------
CREATE TABLE Reservas (
    ID_Reserva SERIAL PRIMARY KEY,
    ID_Instalacion INT NOT NULL,
    ID_Miembro INT NOT NULL,
    Fecha DATE NOT NULL,
    Hora_Inicio TIME NOT NULL,
    Hora_Fin TIME NOT NULL,
    Estado VARCHAR(50),
    FOREIGN KEY (ID_Instalacion) REFERENCES Instalaciones(ID_Instalacion),
    FOREIGN KEY (ID_Miembro) REFERENCES Miembros(ID_Miembro)
);

-- -----------------------------------------------------------------------------
-- Table: Inscripciones
-- Description: Junction table to manage the many-to-many relationship between
--              members and activities.
-- -----------------------------------------------------------------------------
CREATE TABLE Inscripciones (
    ID_Inscripcion SERIAL PRIMARY KEY,
    ID_Miembro INT NOT NULL,
    ID_Actividad INT NOT NULL,
    Fecha_Inscripcion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    Estado VARCHAR(50),
    FOREIGN KEY (ID_Miembro) REFERENCES Miembros(ID_Miembro),
    FOREIGN KEY (ID_Actividad) REFERENCES Actividades(ID_Actividad)
);
