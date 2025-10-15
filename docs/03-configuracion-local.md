# Configuración del Entorno Local

Para ejecutar el proyecto en un entorno de desarrollo local, sigue estos pasos:

1.  **Clonar el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_DIRECTORIO>
    ```

2.  **Instalar dependencias:**
    El proyecto utiliza `npm` como gestor de paquetes.
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env.local` en la raíz del proyecto, copiando el contenido de `.env.example` (si existe) o añadiendo las siguientes variables:
    ```
    NEXT_PUBLIC_SUPABASE_URL=URL_DE_TU_PROYECTO_SUPABASE
    NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_ANON_KEY_DE_SUPABASE
    ```
    Estas credenciales se encuentran en la configuración de tu proyecto de Supabase.

4.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:3000`.
