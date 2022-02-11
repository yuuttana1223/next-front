import { Favorite } from "src/apis/favorite";
import { API_URL } from "src/urls/api";
import useSWRImmutable from "swr/immutable";

export const useAllFavorites = () => {
  const { data: favorites, error: favoritesError } = useSWRImmutable<
    Favorite[],
    Error
  >(`${API_URL}/favorites`);
  return {
    favorites,
    favoritesError,
    favoritesLoading: !favorites && !favoritesError,
  };
};
