import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "src/urls/api";
export type Favorite = {
  user_id: number;
  review_id: number;
};

export const postFavorite = (reviewId: number) => {
  return axios.post<Favorite>(`${API_URL}/reviews/${reviewId}/favorites`, {
    "access-token": Cookies.get("access_token"),
    client: Cookies.get("client"),
    uid: Cookies.get("uid"),
  });
};

export const deleteFavorite = (reviewId: number) => {
  return axios.delete(`${API_URL}/reviews/${reviewId}/favorites`, {
    headers: {
      "access-token": Cookies.get("access_token") ?? "",
      client: Cookies.get("client") ?? "",
      uid: Cookies.get("uid") ?? "",
    },
  });
};
