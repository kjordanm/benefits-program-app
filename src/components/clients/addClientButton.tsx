"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CreateClient } from "@/services/clients";

type Client = {
  dni?: string;
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  rango?: string | number;
};

type Props = {
  onAdd: (c: Client) => void;
};

const schema = z.object({
  dni: z
    .string()
    .min(8, "El DNI debe tener al menos 8 dígitos")
    .max(12, "El DNI no puede exceder 12 caracteres"),

  email: z
    .string()
    .email("Correo electrónico inválido")
    .optional()
    .or(z.literal("")),

  nombre: z.string().optional(),
  apellido: z.string().optional(),

  rango: z
    .string()
    .min(1, "Debe seleccionar un segmento"),
});

type FormValues = z.infer<typeof schema>;

const AddClientButton = ({ onAdd }: Props) => {
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      dni: "",
      nombre: "",
      apellido: "",
      email: "",
      rango: "",
    },
  });

  const submit = async (data: FormValues) => {
    const response = await CreateClient(data as any);

    if (response.success) {
      onAdd(response.data);
      form.reset();
      setOpen(false);
    } else {
      console.error("Error al crear cliente:", response.data.message);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="default">Agregar cliente</Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-4">
        <Card className="p-4">
          <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="dni">DNI *</Label>
              <Input
                id="dni"
                {...form.register("dni")}
                placeholder="12345678"
              />
              {form.formState.errors.dni && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.dni.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="nombre">Nombre *</Label>
                <Input id="nombre" {...form.register("nombre")} />
                {form.formState.errors.nombre && (
                  <p className="text-red-500 text-xs">
                    {form.formState.errors.nombre.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="apellido">Apellido</Label>
                <Input id="apellido" {...form.register("apellido")} />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...form.register("email")} />
              {form.formState.errors.email && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label>Segmento *</Label>

              <Select
                value={form.watch("rango")}
                onValueChange={(value) => form.setValue("rango", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un segmento" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="3">Segmento 1</SelectItem>
                  <SelectItem value="4">Segmento 2</SelectItem>
                  <SelectItem value="5">Segmento 3</SelectItem>
                  <SelectItem value="6">Segmento 4</SelectItem>
                  <SelectItem value="7">Segmento 5</SelectItem>
                  <SelectItem value="8">Segmento 6</SelectItem>
                </SelectContent>
              </Select>

              {form.formState.errors.rango && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.rango.message}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                Guardar
              </Button>

              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default AddClientButton;
