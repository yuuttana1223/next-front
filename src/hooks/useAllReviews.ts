import { Review } from "src/types/review";
import { API_URL } from "src/urls/api";
import { fetcher } from "src/utils/fetcher";
import useSWRImmutable from "swr/immutable";

export const useAllReviews = () => {
  const { data, error } = useSWRImmutable<Review[], Error>(
    `${API_URL}/reviews`,
    fetcher
  );
  return { reviews: data, reviewsError: error, loading: !data && !error };
};
