import axios from "axios";
import Cookies from "js-cookie";
import { FormValues } from "src/components/Form/ReviewForm";
import { API_URL } from "src/urls/api";

export type Review = {
  id: number;
  user_id: number;
  username: string;
  lecture_name: string;
  teacher_name: string;
  lesson_type: string;
  adequacy: string;
  submission_quantity: string;
  difficulty: string;
  is_ending_test: boolean;
  content: string;
  created_at: string;
  updated_at: string;
};

export const postReview = (params: FormValues) => {
  return axios.post<Review>(`${API_URL}/reviews`, {
    "access-token": Cookies.get("access_token"),
    client: Cookies.get("client"),
    uid: Cookies.get("uid"),
    review: {
      lecture_name: params.lecture_name2 ?? params.lecture_name,
      teacher_name: params.teacher_name2 ?? params.teacher_name,
      lesson_type: params.lesson_type,
      adequacy: params.adequacy,
      submission_quantity: params.submission_quantity,
      difficulty: params.difficulty,
      is_ending_test: params.is_ending_test,
      content: params.content,
    },
  });
};

export const patchReview = (params: FormValues, reviewId?: number) => {
  return axios.patch<Review>(`${API_URL}/reviews/${reviewId}`, {
    "access-token": Cookies.get("access_token"),
    client: Cookies.get("client"),
    uid: Cookies.get("uid"),
    review: {
      lecture_name: params.lecture_name2
        ? params.lecture_name2
        : params.lecture_name,
      teacher_name: params.teacher_name2
        ? params.teacher_name2
        : params.teacher_name,
      lesson_type: params.lesson_type,
      adequacy: params.adequacy,
      submission_quantity: params.submission_quantity,
      difficulty: params.difficulty,
      is_ending_test: params.is_ending_test,
      content: params.content,
    },
  });
};

export const deleteReview = (reviewId?: number) => {
  return axios.delete<Review>(`${API_URL}/reviews/${reviewId}`, {
    headers: {
      "access-token": Cookies.get("access_token") ?? "",
      client: Cookies.get("client") ?? "",
      uid: Cookies.get("uid") ?? "",
    },
  });
};
