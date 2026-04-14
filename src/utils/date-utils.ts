import { differenceInDays, parseISO } from 'date-fns';

/**
 * Calculates the difference in days between two dates.
 * @param fechaInicio ISO string or Date
 * @param fechaFin ISO string or Date
 * @returns Number of days
 */
export function obtenerDiferenciaDias(fechaInicio: string | Date, fechaFin: string | Date): number {
  const inicio = typeof fechaInicio === 'string' ? parseISO(fechaInicio) : fechaInicio;
  const fin = typeof fechaFin === 'string' ? parseISO(fechaFin) : fechaFin;
  
  return Math.abs(differenceInDays(fin, inicio));
}
