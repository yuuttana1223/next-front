import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "src/urls/api";
export type Like = {
  user_id: number;
  review_id: number;
};

export const postLike = (reviewId: number) => {
  return axios.post<Like>(`${API_URL}/reviews/${reviewId}/likes`, {
    "access-token": Cookies.get("access_token"),
    client: Cookies.get("client"),
    uid: Cookies.get("uid"),
  });
};

export const deleteLike = (reviewId: number) => {
  return axios.delete(`${API_URL}/reviews/${reviewId}/likes`, {
    headers: {
      "access-token": Cookies.get("access_token") ?? "",
      client: Cookies.get("client") ?? "",
      uid: Cookies.get("uid") ?? "",
    },
  });
};
