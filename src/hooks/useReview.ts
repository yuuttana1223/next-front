import useSWRImmutable from "swr/immutable";
import { Review as ReviewType } from "src/types/review";
import { API_URL } from "src/urls/api";
import { useRouter } from "next/router";

export const useReview = () => {
  const router = useRouter();

  const { data: review, error: reviewError } = useSWRImmutable<
    ReviewType,
    Error
  >(router.query.id ? `${API_URL}/reviews/${router.query.id}` : null);

  return { review, reviewError, loading: !review && !reviewError };
};
