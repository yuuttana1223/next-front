import { Like } from "src/apis/like";
import { API_URL } from "src/urls/api";
import useSWRImmutable from "swr/immutable";

export const useAllLikes = () => {
  const { data: likes, error: likesError } = useSWRImmutable<Like[], Error>(
    `${API_URL}/likes`
  );
  return {
    likes,
    likesError,
    likesLoading: !likes && !likesError,
  };
};
