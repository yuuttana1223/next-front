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
  level_of_satisfaction: string;
  workload: string;
  difficulty: string;
  is_ending_test: boolean;
  content: string;
  created_at: string;
  updated_at: string;
};

export type SelectType = {
  sortBy: string;
  name: string;
  value: string;
  text: string;
};

export const selects: SelectType[] = [
  {
    sortBy: "created_at",
    name: "order",
    value: "desc",
    text: "投稿日時が新しい順",
  },
  {
    sortBy: "created_at",
    name: "order",
    value: "asc",
    text: "投稿日時が古い順",
  },
  { sortBy: "lesson", name: "type", value: "対面", text: "対面" },
  {
    sortBy: "lesson",
    name: "type",
    value: "リアルタイムオンライン",
    text: "リアルタイムオンライン",
  },
  {
    sortBy: "lesson",
    name: "type",
    value: "ハイブリッド",
    text: "ハイブリッド",
  },
  {
    sortBy: "lesson",
    name: "type",
    value: "オンデマンド",
    text: "オンデマンド",
  },
];

export const fetchReviews = (queryParams: string) => {
  return axios.get<Review[]>(`${API_URL}/reviews${queryParams}`);
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
      level_of_satisfaction: params.level_of_satisfaction,
      workload: params.workload,
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
      level_of_satisfaction: params.level_of_satisfaction,
      workload: params.workload,
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
