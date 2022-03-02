import axios from "axios";
import Cookies from "js-cookie";
import { CommentValue } from "src/components/Form/CommentForm";
import { API_URL } from "src/urls/api";
export type Comment = {
  id: number;
  body: string;
  username: string;
  user_id: number;
  review_id: number;
  created_at: string;
  updated_at: string;
};

export const postComment = (params: CommentValue, reviewId?: number) => {
  return axios.post<Comment>(`${API_URL}/reviews/${reviewId}/comments`, {
    "access-token": Cookies.get("access_token"),
    client: Cookies.get("client"),
    uid: Cookies.get("uid"),
    comment: {
      body: params.body,
    },
  });
};

export const patchComment = (
  params: CommentValue,
  reviewId?: number,
  commentId?: number
) => {
  return axios.patch<Comment>(
    `${API_URL}/reviews/${reviewId}/comments/${commentId}`,
    {
      "access-token": Cookies.get("access_token"),
      client: Cookies.get("client"),
      uid: Cookies.get("uid"),
      comment: {
        body: params.body,
      },
    }
  );
};

export const deleteComment = (reviewId?: number, commentId?: number) => {
  return axios.delete(`${API_URL}/reviews/${reviewId}/comments/${commentId}`, {
    headers: {
      "access-token": Cookies.get("access_token") ?? "",
      client: Cookies.get("client") ?? "",
      uid: Cookies.get("uid") ?? "",
    },
  });
};
