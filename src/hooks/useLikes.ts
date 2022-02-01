import useSWRImmutable from "swr/immutable";
import { API_URL } from "src/urls/api";
import { Like } from "src/apis/like";

export const useLikes = (reviewId?: number | string | string[]) => {
  const { data: likes, error: likesError } = useSWRImmutable<Like[], Error>(
    reviewId ? `${API_URL}/reviews/${reviewId}/likes` : null
  );

  return {
    likes,
    likesError,
    likesLoading: !likes && !likesError,
  };
};
