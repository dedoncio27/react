# Defensa de la Arquitectura Final (Módulo 3)

Este proyecto representa la culminación de la Práctica 4, integrando lógica de negocio compleja con un ecosistema moderno de UI (React + Vite).

## Patrones de Ingeniería Implementados

### 1. Componentes Genéricos (`DataTable<T>`)
Hemos implementado una tabla de datos que utiliza genéricos de TypeScript para abstraer la lógica de renderizado.
- **Beneficio:** Reutilización total. La misma tabla puede renderizar Estudiantes, Profesores o Asignaturas sin duplicar código, manteniendo la seguridad de tipos en cada columna.

### 2. Análisis Exhaustivo con el tipo `never`
En `utils/reporte.ts`, la función `generarReporteExhaustivo` utiliza el tipo `never` en el bloque `default`.
- **Beneficio:** Seguridad ante el crecimiento. Si mañana el sistema añade un nuevo estado de matrícula (ej. "CANCELADA"), TypeScript marcará un error de compilación en esta función, obligándonos a manejar el nuevo estado. Esto elimina una de las mayores fuentes de bugs en producción.

### 3. Tipos de Utilidad (`Partial<T>`)
Para el estado de edición de filas en `App.tsx`, hemos utilizado `Partial<AlumnoExtendido>`.
- **Beneficio:** Flexibilidad en estados temporales. El usuario puede editar solo un campo (nombre) sin que el estado del componente exija todas las propiedades obligatorias de la entidad completa en ese momento.

### 4. Interoperabilidad con Librerías Externas
La integración con `date-fns` demuestra cómo gestionar tipos en librerías de terceros (usando `@types/node` y firmas estrictas).
- **Beneficio:** Delegación de lógica compleja a estándares de la industria sin perder el control de tipos que ofrece TypeScript.

## Conclusión
El uso de TypeScript en este ecosistema no solo ha prevenido errores de tipado, sino que ha servido como una **documentación viva**. Los genéricos y las uniones discriminadas han permitido crear una arquitectura que escala de forma predecible, reduciendo drásticamente la carga de pruebas manuales y errores en tiempo de ejecución (runtime).
