# Informe de Deuda Técnica

Este documento detalla la deuda técnica identificada en el proyecto y propone un plan de acción para abordarla.

## Resumen

La deuda técnica principal del proyecto es la **inconsistencia en la estrategia de eliminación de datos**. Aunque las convenciones y requerimientos del sistema estipulan el uso de "soft deletes" (borrado lógico), las implementaciones actuales en los Server Actions están utilizando "hard deletes" (borrado físico), lo que contradice directamente las directrices y pone en riesgo la integridad de los datos históricos.

---

## Puntos de Deuda Técnica

### 1. Uso de Borrado Físico (Hard Deletes) en Server Actions

- **Descripción:** Las funciones `delete` en los archivos `actions.ts` de todos los módulos (`actividades`, `instalaciones`, `tipos-de-membresia`) ejecutan una operación `supabase.from(...).delete()`. Esto elimina permanentemente el registro de la base de datos.
- **Impacto:**
    - **Pérdida de Datos:** Se pierde la capacidad de recuperar registros eliminados o de mantener un historial.
    - **Inconsistencia:** Contradice la convención establecida de usar una columna `deleted_at` para el borrado lógico.
    - **Riesgo:** Si un registro se elimina por error, no hay forma de recuperarlo.
- **Archivos Afectados:**
    - `src/app/actividades/actions.ts`
    - `src/app/instalaciones/actions.ts`
    - `src/app/tipos-de-membresia/actions.ts`

### 2. Consultas de Datos sin Filtrado de Registros Eliminados

- **Descripción:** Las páginas que listan los datos (ej. `src/app/actividades/page.tsx`) actualmente hacen un `select('*')` sin filtrar los registros que podrían estar marcados como eliminados (si el borrado lógico estuviera implementado).
- **Impacto:** Si se corrige el punto anterior para usar borrado lógico, las listas empezarían a mostrar registros que se consideran eliminados, generando confusión en la interfaz.
- **Archivos Afectados:**
    - `src/app/actividades/page.tsx`
    - `src/app/instalaciones/page.tsx`
    - `src/app/tipos-de-membresia/page.tsx`
    - `src/app/page.tsx` (en la consulta de miembros)

---

## Plan de Acción (Prompts para Agentes)

A continuación se presentan los prompts listos para ser asignados a otros agentes para corregir esta deuda técnica.

### **Prompt 1: Corregir el Borrado Físico en el Módulo de Actividades**

**Título:** Refactorizar la función `deleteActividad` para usar Soft Deletes

**Descripción:**
"Hola, necesito tu ayuda para corregir una inconsistencia en el código. Actualmente, la función `deleteActividad` en `src/app/actividades/actions.ts` realiza un borrado físico de la base de datos.

Tu tarea es modificar esta función para que, en lugar de borrar el registro, realice una actualización (update) y establezca la fecha y hora actual en la columna `deleted_at` del registro correspondiente.

**Requerimientos:**
1.  Abre el archivo `src/app/actividades/actions.ts`.
2.  Modifica la función `deleteActividad` para que use `supabase.from('actividades').update({ deleted_at: new Date().toISOString() })` en lugar de `.delete()`.
3.  Asegúrate de que la condición `.eq('id_actividad', id)` se mantenga.
4.  Verifica que la caché se siga revalidando con `revalidatePath('/actividades')` después de la operación."

### **Prompt 2: Implementar Filtrado de Borrado Lógico en la Lista de Actividades**

**Título:** Actualizar la consulta de actividades para excluir registros eliminados

**Descripción:**
"Hola, como parte de la implementación del borrado lógico, necesito que actualices la consulta de la lista de actividades.

Tu tarea es modificar la función `getActividades` en `src/app/actividades/page.tsx` para que solo obtenga los registros que no han sido eliminados lógicamente.

**Requerimientos:**
1.  Abre el archivo `src/app/actividades/page.tsx`.
2.  En la función `getActividades`, modifica la consulta de Supabase para añadir un filtro que solo seleccione las filas donde `deleted_at` es `null`.
3.  La consulta debería quedar similar a: `supabase.from('actividades').select('*').is('deleted_at', null)`."

### **Prompt 3: Aplicar Soft Deletes y Filtrado a los Módulos Restantes**

**Título:** Generalizar la implementación de Soft Deletes en toda la aplicación

**Descripción:**
"Hola, ya hemos corregido el borrado lógico en el módulo de 'actividades'. Ahora necesito que apliques el mismo patrón al resto de los módulos.

Tu tarea es replicar la lógica de 'soft deletes' y el filtrado correspondiente en los módulos de 'instalaciones' y 'tipos-de-membresia'.

**Requerimientos:**
1.  **Para `instalaciones`:**
    -   En `src/app/instalaciones/actions.ts`, modifica la función `deleteInstalacion` para que actualice el campo `deleted_at`.
    -   En `src/app/instalaciones/page.tsx`, modifica la función `getInstalaciones` para filtrar por `deleted_at` es `null`.
2.  **Para `tipos-de-membresia`:**
    -   En `src/app/tipos-de-membresia/actions.ts`, modifica la función `deleteTipoDeMembresia` para que actualice `deleted_at`.
    -   En `src/app/tipos-de-membresia/page.tsx`, modifica la función `getTiposDeMembresia` para filtrar por `deleted_at` es `null`.
3.  **Para `miembros` (página principal):**
    -   En `src/app/page.tsx`, dentro del `useEffect`, modifica la consulta `supabase.from('miembros').select()` para que también filtre por `deleted_at` es `null`."
