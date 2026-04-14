export interface Estudiante {
  id: string;
  nombreCompleto: string;
  email: string;
}

export interface Asignatura {
  id: string;
  nombre: string;
  creditos: number;
}

export interface MatriculaActiva {
  estado: "ACTIVA";
  asignaturas: string[];
}

export interface MatriculaSuspendida {
  estado: "SUSPENDIDA";
  motivo: string;
}

export interface MatriculaFinalizada {
  estado: "FINALIZADA";
  notaMedia: number;
}

// Añadimos un cuarto estado para demostrar el exhaustiveness checking más adelante
export interface MatriculaProvisional {
  estado: "PROVISIONAL";
  fechaVencimiento: string;
}

export type EstadoMatricula = 
  | MatriculaActiva 
  | MatriculaSuspendida 
  | MatriculaFinalizada 
  | MatriculaProvisional;

export interface RespuestaAPI<T> {
  codigoEstado: number;
  exito: boolean;
  datos: T;
  errores?: string[];
}
