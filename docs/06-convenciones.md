# Convenciones y Buenas Prácticas

Para mantener la consistencia y calidad del código, se siguen las siguientes convenciones:

- **Server Actions:** Toda la lógica de mutación de datos (CUD) debe definirse en archivos `actions.ts` dedicados dentro de su respectiva carpeta de módulo (ej. `src/app/actividades/actions.ts`). Los componentes de cliente deben importar y usar estas acciones en lugar de definir la lógica inline.
- **Soft Deletes (Borrado Lógico):** Los registros de la base de datos **no deben ser eliminados físicamente**. En su lugar, se utiliza un borrado lógico (soft delete) a través de una columna `deleted_at`.
    - Al **eliminar** un registro, se debe hacer un `update` para establecer la fecha y hora actual en la columna `deleted_at`.
    - Al **consultar** datos para mostrar en la aplicación, siempre se debe añadir un filtro para excluir los registros que tengan un valor en `deleted_at` (ej. `...where('deleted_at', 'is', null)`).
- **Componentes:** Se sigue el patrón de tener un `page.tsx` como Server Component para la carga de datos, el cual pasa la información a un componente hijo (ej. `client-page.tsx`) que se encarga de la interactividad del lado del cliente.
- **Alias de Importación:** Se utiliza el alias `@/*` para las importaciones desde el directorio `src`, configurado en `tsconfig.json`.
- **Estilo de Código:** Se utiliza ESLint para el formateo y la calidad del código. Ejecuta `npm run lint` para verificar el código antes de hacer un commit.
