import axios from "axios";
import { API_URL } from "src/urls/api";
import Cookies from "js-cookie";
import { User } from "src/types/user";

type SignUpParams = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type SignInParams = Pick<SignUpParams, "email" | "password">;

type CurrentUser = {
  is_login: boolean;
  user?: User;
  message?: string;
};

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
