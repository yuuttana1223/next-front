import useSWRImmutable from "swr/immutable";
import { Review } from "src/apis/review";
import { API_URL } from "src/urls/api";

export const useFavoriteReviews = (userId?: number) => {
  const { data: favoriteReviews, error: favoriteReviewsError } =
    useSWRImmutable<Review[], Error>(
      userId ? `${API_URL}/users/${userId}/favorites` : null
    );

  return {
    favoriteReviews,
    favoriteReviewsError,
    favoriteReviewsLoading: !favoriteReviews && !favoriteReviewsError,
  };
};
