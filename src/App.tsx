import { useState } from 'react';
import type { Estudiante, EstadoMatricula } from './domain/types';
import { DataTable, type Column } from './components/DataTable';
import { generarReporteExhaustivo } from './utils/reporte';
import { obtenerDiferenciaDias } from './utils/date-utils';
import './index.css';

// Registro extendido para la tabla que incluye el estado de matrícula
interface AlumnoExtendio extends Estudiante {
  matricula: EstadoMatricula;
}

function App() {
  // Datos de prueba
  const [alumnos, setAlumnos] = useState<AlumnoExtendio[]>([
    {
      id: '1',
      nombreCompleto: 'Adrian Doe',
      email: 'adrian@example.com',
      matricula: { estado: 'ACTIVA', asignaturas: ['TS', 'React'] }
    },
    {
      id: '2',
      nombreCompleto: 'Ana García',
      email: 'ana@example.com',
      matricula: { estado: 'FINALIZADA', notaMedia: 9.2 }
    },
    {
      id: '3',
      nombreCompleto: 'Luis Pérez',
      email: 'luis@example.com',
      matricula: { estado: 'PROVISIONAL', fechaVencimiento: '2026-05-01' }
    }
  ]);

  // Tipado de utilidad: Partial<T> para el estado de edición
  const [editando, setEditando] = useState<Partial<AlumnoExtendio>>({});

  const columnas: Column<AlumnoExtendio>[] = [
    { key: 'id', header: 'ID' },
    {
      key: 'nombreCompleto',
      header: 'Nombre',
      render: (val, item) => (
        editando.id === item.id ? (
          <input
            className="edit-input"
            value={editando.nombreCompleto || val as string}
            onChange={(e) => setEditando({ ...editando, nombreCompleto: e.target.value })}
          />
        ) : val as string
      )
    },
    {
      key: 'matricula',
      header: 'Estado de Matrícula',
      render: (val) => {
        const estado = val as EstadoMatricula;
        return (
          <span className={`status-badge status-${estado.estado === 'ACTIVA' ? 'active' : estado.estado === 'PROVISIONAL' ? 'info' : 'error'}`}>
            {generarReporteExhaustivo(estado)}
          </span>
        );
      }
    },
    {
      key: 'id',
      header: 'Acciones',
      render: (_, item) => (
        editando.id === item.id ? (
          <button onClick={() => {
            setAlumnos(alumnos.map(a => a.id === item.id ? { ...a, ...editando } as AlumnoExtendio : a));
            setEditando({});
          }}>Guardar</button>
        ) : (
          <button onClick={() => setEditando(item)}>Editar</button>
        )
      )
    }
  ];

  const diasRestantes = obtenerDiferenciaDias(new Date(), '2026-12-31');

  return (
    <div className="app-container">
      <header>
        <h1 className="table-title">Gestión de Alumnos v2.0</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Días hasta fin de curso: <strong>{diasRestantes}</strong>
        </p>
      </header>

      <main>
        <DataTable
          data={alumnos}
          columns={columnas}
          title="Listado de Matriculaciones"
        />
      </main>

      <section style={{ marginTop: '3rem', opacity: 0.6 }}>
        <h3>Arquitectura Implementada:</h3>
        <ul>
          <li>Genéricos (`DataTable&lt;T&gt;`)</li>
          <li>Partial para edición (`Partial&lt;AlumnoExtendio&gt;`)</li>
          <li>Exhaustiveness checking (`never` en reportes)</li>
          <li>Librerías externas (`date-fns`)</li>
        </ul>
      </section>
    </div>
  );
}

export default App;
