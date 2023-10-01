import { ApiClient } from "../api/ApiClient";
import { User } from "../models/User";

export const getUser = async (id: string): Promise<User> => {
  const response = await ApiClient.get(`/users/${id}`);
  return response.data;
};

export const getUsers = async (): Promise<User[]> => {
  const response = await ApiClient.get("/users");
  return response.data;
};

export const createUser = async (user: User): Promise<User> => {
  const response = await ApiClient.post("/users", user);
  return response.data;
};

export const updateUser = async (id: number, user: User): Promise<User> => {
  const response = await ApiClient.put(`users/${id}`, user);
  return response.data;
};
