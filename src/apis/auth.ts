import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "src/urls/api";

type SignUpParams = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const signUp = (params: SignUpParams) => {
  axios
    .post<SignUpParams>(`${API_URL}/auth`, {
      name: params.name,
      email: params.email,
      password: params.password,
      password_confirmation: params.password_confirmation,
    })
    .then((res) => {
      if (res.status === 200) {
        Cookies.set("access_token", res.headers["access-token"]);
        Cookies.set("client", res.headers["client"]);
        Cookies.set("uid", res.headers["uid"]);
      } else {
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
