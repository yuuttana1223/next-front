import useSWRImmutable from "swr/immutable";
import { Review } from "src/apis/review";
import { API_URL } from "src/urls/api";
import { useRouter } from "next/router";

export const useReview = () => {
  const router = useRouter();

  const { data: review, error: reviewError } = useSWRImmutable<Review, Error>(
    router.query.id ? `${API_URL}/reviews/${router.query.id}` : null
  );

  return {
    review: review,
    reviewError,
    reviewLoading: !review && !reviewError,
  };
};
