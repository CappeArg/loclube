# Arquitectura

La aplicación sigue una arquitectura moderna basada en **Next.js con App Router**.

- **Frontend:** Construido con React y TypeScript. El enrutamiento se gestiona a través del App Router de Next.js, favoreciendo el uso de Server Components para el renderizado inicial y la carga de datos.
- **Backend:** Se utiliza **Supabase** como "Backend as a Service" (BaaS), proveyendo la base de datos PostgreSQL, autenticación y APIs auto-generadas.
- **Comunicación:** La interacción con el backend se realiza principalmente a través de **Next.js Server Actions** para mutaciones de datos (crear, actualizar, eliminar) y directamente desde Server Components para la obtención de datos, asegurando que la lógica de negocio se mantenga en el servidor.
- **Estilos:** Se utiliza **Tailwind CSS** para un enfoque "utility-first" en el diseño de la interfaz.
