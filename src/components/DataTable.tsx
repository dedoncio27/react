import React from 'react';

/**
 * Definition of a column for the generic table.
 * K is a key of the data type T.
 */
export interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
}

/**
 * A highly reusable and type-safe DataTable component.
 */
export function DataTable<T extends { id: string | number }>({ data, columns, title }: DataTableProps<T>) {
  return (
    <div className="data-table-container">
      {title && <h2 className="table-title">{title}</h2>}
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key as string}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                {columns.map((col) => (
                  <td key={col.key as string}>
                    {col.render 
                      ? col.render(item[col.key], item) 
                      : (item[col.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', padding: '2rem' }}>
                No hay datos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
