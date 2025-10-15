# Despliegue

El proyecto está configurado para un despliegue sencillo en plataformas como **Vercel**, que ofrece integración nativa con Next.js.

### Despliegue en Vercel

1.  **Conectar el Repositorio:** Importa tu repositorio de Git (GitHub, GitLab, Bitbucket) en Vercel.
2.  **Configurar el Proyecto:** Vercel detectará automáticamente que es un proyecto Next.js y configurará los comandos de build (`npm run build`) y el directorio de salida.
3.  **Añadir Variables de Entorno:** Es crucial añadir las mismas variables de entorno que en el archivo `.env.local` a la configuración del proyecto en Vercel. Navega a `Settings -> Environment Variables` y añade:
    -   `NEXT_PUBLIC_SUPABASE_URL`
    -   `NEXT_PUBLIC_SUPABASE_ANON_KEY`

    **¡Importante!** Un error común durante el despliegue es el `supabaseUrl is required`. Esto ocurre si la integración de Supabase está habilitada en Vercel pero las variables de entorno no se han configurado correctamente en el panel del proyecto.

4.  **Desplegar:** Con la configuración completa, cualquier `push` a la rama principal (generalmente `main`) activará un nuevo despliegue.
