import axios from "axios";
import { API_URL } from "src/urls/api";

type SignUpParams = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type SignInParams = Pick<SignUpParams, "email" | "password">;

export const signUp = (params: SignUpParams) => {
  return axios.post<SignUpParams>(`${API_URL}/auth`, {
    name: params.name,
    email: params.email,
    password: params.password,
    password_confirmation: params.password_confirmation,
  });
};

export const signIn = (params: SignInParams) => {
  return axios.post<SignInParams>(`${API_URL}/auth/sign_in`, {
    email: params.email,
    password: params.password,
  });
};
