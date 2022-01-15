import axios from "axios";
import { FormValues } from "src/components/Form/ReviewForm";
import { Review } from "src/types/review";
import { API_URL } from "src/urls/api";

export const postReview = (params: FormValues, userId?: number) => {
  return axios.post<Review>(`${API_URL}/reviews`, {
    review: {
      user_id: userId,
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
