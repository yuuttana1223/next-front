import axios from "axios";
import { API_URL } from "src/urls/api";
import Cookies from "js-cookie";

export type User = {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  allowPasswordChange: boolean;
  created_at: string;
  updated_at: string;
};

type SignUpParams = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type SignInParams = Pick<SignUpParams, "email" | "password">;

type CurrentUser = {
  user?: User;
  message?: string;
};

type Response = {
  data: User;
  status: string;
};

export const signUp = (params: SignUpParams) => {
  return axios.post<Response>(`${API_URL}/auth`, {
    name: params.name,
    email: params.email,
    password: params.password,
    password_confirmation: params.password_confirmation,
  });
};

export const signIn = (params: SignInParams) => {
  return axios.post<Response>(`${API_URL}/auth/sign_in`, {
    email: params.email,
    password: params.password,
  });
};

export const signOut = () => {
  return axios.delete(`${API_URL}/auth/sign_out`, {
    headers: {
      "access-token": Cookies.get("access_token") ?? "",
      client: Cookies.get("client") ?? "",
      uid: Cookies.get("uid") ?? "",
    },
  });
};

export const fetchCurrentUser = () => {
  const accessToken = Cookies.get("access_token");
  const client = Cookies.get("client");
  const uid = Cookies.get("uid");

  if (accessToken && client && uid) {
    return axios.get<CurrentUser>(`${API_URL}/auth/sessions`, {
      headers: {
        access_token: accessToken,
        client,
        uid,
      },
    });
  }
};
