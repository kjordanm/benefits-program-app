"use client";

import React from "react";

type Client = {
  dni?: string;
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  rango?: string | number;
};

type Props = {
  clients: Client[];
};

const ClientsTable = ({ clients }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DNI</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Teléfono</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Rango</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {clients.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  No hay clientes. Usa <strong>Agregar cliente</strong> o <strong>Carga masiva</strong>.
                </td>
              </tr>
            ) : (
              clients.map((c, idx) => (
                <tr key={c.dni ?? idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">{c.dni ?? "—"}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{c.nombre ?? "—"}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{c.apellido ?? "—"}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 break-words max-w-[200px]">{c.email ?? "—"}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 hidden sm:table-cell">{c.telefono ?? "—"}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 hidden md:table-cell">{c.rango ?? "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile compact list for better UX on very small screens */}
      <div className="sm:hidden p-4">
        {clients.length > 0 &&
          clients.map((c, idx) => (
            <div key={c.dni ?? idx} className="mb-3 border rounded p-3 bg-white shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-medium">{c.nombre ?? "—"} {c.apellido ?? ""}</div>
                  <div className="text-xs text-gray-500">{c.email ?? "—"}</div>
                </div>
                <div className="text-xs text-gray-400">{c.rango ?? "—"}</div>
              </div>
              <div className="mt-2 text-xs text-gray-600">DNI: {c.dni ?? "—"}</div>
              <div className="mt-1 text-xs text-gray-600">Tel: {c.telefono ?? "—"}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ClientsTable;
