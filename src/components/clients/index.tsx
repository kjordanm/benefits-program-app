"use client";

import { useState } from "react";
import AddClientButton from "./addClientButton";
import BulkUploadButton from "./bulkUploadButton";
import ClientsTable from "./clientsTable";

type Client = {
  dni?: string;
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  rango?: string | number;
};

const ClientesIndex = () => {
  const [clients, setClients] = useState<Client[]>([]);

  const handleAddClient = (newClient: Client) => {
    setClients((prev) => [newClient, ...prev]);
  };

  const handleBulkAdd = (newClients: Client[]) => {
    // dedupe simple por DNI si existe
    const map = new Map<string, Client>();
    [...newClients, ...clients].forEach((c) => {
      const key = c.dni ?? `${Math.random()}`;
      map.set(key, c);
    });

    setClients(Array.from(map.values()));
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold">Clientes — Cuenta Sueldo</h1>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <AddClientButton onAdd={handleAddClient} />
            <BulkUploadButton onBulkAdd={handleBulkAdd} />
          </div>
        </header>

        <main>
          <ClientsTable clients={clients} />
        </main>
      </div>
    </div>
  );
};

export default ClientesIndex;
