import { Comment } from "src/apis/reviewComment";
import { API_URL } from "src/urls/api";
import useSWRImmutable from "swr/immutable";

export const useAllComments = () => {
  const { data: comments, error: commentsError } = useSWRImmutable<
    Comment[],
    Error
  >(`${API_URL}/comments`);
  return {
    comments,
    commentsError,
    commentsLoading: !comments && !commentsError,
  };
};
