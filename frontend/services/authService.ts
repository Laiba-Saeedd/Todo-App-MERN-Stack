import { api } from "./api";

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/login", { email, password });
  return res.data;
};


export const registerUser = async (email: string, password: string) => {
  await api.post("/register", { email, password });
};