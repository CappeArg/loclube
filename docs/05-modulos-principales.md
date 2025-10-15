# Módulos Principales

La aplicación se organiza en torno a los siguientes módulos de negocio, cada uno ubicado en su propio directorio dentro de `src/app/`:

### 1. Tipos de Membresía (`src/app/tipos-de-membresia`)
- **Propósito:** Gestiona los diferentes tipos de membresías que el club ofrece.
- **Funcionalidades:** CRUD (Crear, Leer, Actualizar, Eliminar) para los tipos de membresía.
- **Estructura:**
    - `page.tsx`: Lista todas las membresías (Server Component).
    - `new/page.tsx`: Formulario para crear una nueva membresía.
    - `[id]/page.tsx`: Muestra los detalles de una membresía específica.
    - `[id]/edit/page.tsx`: Formulario para editar una membresía.
    - `actions.ts`: Contiene las Server Actions para `create`, `update` y `delete`.

### 2. Actividades (`src/app/actividades`)
- **Propósito:** Administra las actividades que los miembros pueden realizar.
- **Funcionalidades:** CRUD completo para las actividades.
- **Estructura:** Sigue el mismo patrón que "Tipos de Membresía".

### 3. Instalaciones (`src/app/instalaciones`)
- **Propósito:** Gestiona las instalaciones del club (canchas, piscinas, etc.).
- **Funcionalidades:** CRUD completo para las instalaciones.
- **Estructura:** Sigue el mismo patrón que los módulos anteriores.

### 4. Autenticación (`src/app/login` y `src/context/AuthContext.tsx`)
- **Propósito:** Maneja el inicio y cierre de sesión de los usuarios.
- **Componentes Clave:**
    - `src/app/login/page.tsx`: Página de inicio de sesión que utiliza `Auth` de Supabase UI.
    - `src/context/AuthContext.tsx`: Un contexto de React que provee la información de la sesión del usuario a los componentes del lado del cliente.
