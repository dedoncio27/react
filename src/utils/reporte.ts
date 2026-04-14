import type { EstadoMatricula } from '../domain/types';

/**
 * Generates a report with exhaustiveness checking (never type).
 * If a new state is added to EstadoMatricula and not handled here,
 * TypeScript will throw a compile-time error.
 */
export function generarReporteExhaustivo(estado: EstadoMatricula): string {
  switch (estado.estado) {
    case "ACTIVA":
      return `Activa con ${estado.asignaturas.length} asignaturas.`;
    case "SUSPENDIDA":
      return `Suspendida por: ${estado.motivo}.`;
    case "FINALIZADA":
      return `Finalizada con media de ${estado.notaMedia}.`;
    case "PROVISIONAL":
      return `Provisional hasta ${estado.fechaVencimiento}.`;
    default:
      // Esta línea causaría un error si olvidáramos un caso
      const _comprobacion: never = estado;
      throw new Error(`Estado no manejado: ${_comprobacion}`);
  }
}
