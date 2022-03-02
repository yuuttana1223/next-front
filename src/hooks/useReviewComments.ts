import useSWRImmutable from "swr/immutable";
import { API_URL } from "src/urls/api";
import { Comment } from "src/apis/reviewComment";

export const useReviewComments = (reviewId?: number | string | string[]) => {
  const { data: comments, error: commentsError } = useSWRImmutable<
    Comment[],
    Error
  >(reviewId ? `${API_URL}/reviews/${reviewId}/comments` : null);

  return {
    comments,
    commentsError,
    commentsLoading: !comments && !commentsError,
  };
};
