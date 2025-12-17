import axios from "axios";

type CreateClientPayload = {
  dni: string;
  nombre?: string;
  apellido?: string;
  email: string;
  rango?: string | number;
  message: string
};

export const CreateClient = async (payload: CreateClientPayload) => {
  const apiPayload = {
    dni: payload.dni,
    firstname: payload.nombre ?? "",
    lastname: payload.apellido ?? "",
    email: payload.email,
    segmentId: Number(payload.rango ?? 1),
    createdBy: "frontend-admin",
    message: ""
  };

  const { data } = await axios.post(
    "http://localhost:5001/users",
    apiPayload
  );

  return {
    success: true,
    data: {
      id: data.id,
      ...payload,
    },
  };
};
