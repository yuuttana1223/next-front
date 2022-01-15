import { Review } from "src/types/review";
import { API_URL } from "src/urls/api";
import { fetcher } from "src/utils/fetcher";
import useSWRImmutable from "swr/immutable";

export const useAllReviews = () => {
  const { data: reviews, error: reviewsError } = useSWRImmutable<
    Review[],
    Error
  >(`${API_URL}/reviews`, fetcher);
  return {
    reviews,
    reviewsError,
    loading: !reviews && !reviewsError,
    // 重複した講義を削除(講義の種類)
    lectures: reviews
      ?.map((review) => review.lecture_name)
      .filter(
        (lectureName, index, self) => self.indexOf(lectureName) === index
      ),
    // 重複した講師を削除(講師の種類)
    teachers: reviews
      ?.map((review) => review.teacher_name)
      .filter(
        (teacherName, index, self) => self.indexOf(teacherName) === index
      ),
  };
};
