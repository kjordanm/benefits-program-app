"use client";

import { useRef } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";

type Client = {
  dni?: string;
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  rango?: string | number;
};

type Props = {
  onBulkAdd: (clients: Client[]) => void;
};

const BulkUploadButton = ({ onBulkAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const normalize = (row: any): Client => {
    // intenta mapear columnas comunes (case-insensitive)
    const mapKey = (k: string) => k.toLowerCase().trim();
    const out: Client = {};
    Object.keys(row || {}).forEach((k) => {
      const v = row[k];
      switch (mapKey(k)) {
        case "dni":
        case "documento":
          out.dni = String(v ?? "").trim();
          break;
        case "nombre":
        case "nombres":
          out.nombre = String(v ?? "").trim();
          break;
        case "apellido":
        case "apellidos":
          out.apellido = String(v ?? "").trim();
          break;
        case "email":
        case "correo":
        case "correo electrónico":
          out.email = String(v ?? "").trim();
          break;
        case "telefono":
        case "tel":
          out.telefono = String(v ?? "").trim();
          break;
        case "rango":
          out.rango = v;
          break;
        default:
          break;
      }
    });
    return out;
  };

  const handleFile = (file?: File) => {
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext === "csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsed = (results.data as any[]).map((r) => normalize(r));
          onBulkAdd(parsed);
        },
        error: (err) => {
          console.error(err);
          alert("Error al parsear CSV.");
        },
      });
      return;
    }

    // xlsx / xls
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const wb = XLSX.read(e.target?.result, { type: "binary" });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet, { defval: "" });
        const parsed = (json as any[]).map((r) => normalize(r));
        onBulkAdd(parsed);
      } catch (err) {
        console.error(err);
        alert("Error al parsear XLSX.");
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <button onClick={handleClick} className="bg-emerald-600 text-white px-3 py-2 rounded-md text-sm hover:bg-emerald-700 transition">
        Carga masiva
      </button>

      <input
        ref={inputRef}
        type="file"
        accept=".csv, .xlsx"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          handleFile(file);
          // reset to allow re-upload same file name
          if (e.target) e.target.value = "";
        }}
      />
    </div>
  );
};

export default BulkUploadButton;
