import { VFC, useState, useCallback, useContext } from "react";
import { ReviewItem } from "src/components/Review/ReviewItem";
import { useReview } from "src/hooks/useReview";
import { Loader } from "src/components/Loader";
import { ErrorMessage } from "src/components/Message/ErrorMessage";
import { useReviewLikes } from "src/hooks/useReviewLikes";
import { useRouter } from "next/router";
import { CommentList } from "src/components/Comment/CommentList";
import { CommentForm } from "src/components/Form/CommentForm";
import { useReviewComments } from "src/hooks/useReviewComments";
import { useAllFavorites } from "src/hooks/useAllFavorites";
import { AuthContext } from "src/providers/AuthProvider";

export type CommentState = {
  id?: number;
  body?: string;
};

export const Review: VFC = () => {
  const { review, reviewError } = useReview();
  const router = useRouter();
  const { likes, likesError } = useReviewLikes(router.query.id);
  const { comments } = useReviewComments(review?.id);
  const [reviewComment, setReviewComment] = useState<CommentState>({
    id: undefined,
    body: "",
  });
  const { favorites, favoritesError } = useAllFavorites();
  const { currentUser } = useContext(AuthContext);

  const handleEdit = useCallback((commentId?: number, body?: string) => {
    setReviewComment({
      id: commentId,
      body: body,
    });
  }, []);

  if (reviewError) {
    return <ErrorMessage message={reviewError.message} className="text-xl" />;
  }

  if (likesError) {
    return <ErrorMessage message={likesError.message} className="text-xl" />;
  }

  if (favoritesError) {
    return (
      <ErrorMessage message={favoritesError.message} className="text-xl" />
    );
  }

  if (!review || !comments || !likes || !favorites || !currentUser) {
    return <Loader />;
  }

  return (
    <div className="p-4 -m-4 mx-auto w-full md:w-3/5 lg:w-2/5">
      <ReviewItem
        review={review}
        likes={likes}
        isEditable
        comments={comments}
        isFavorite={favorites.some(
          (favorite) =>
            favorite.review_id === review.id &&
            favorite.user_id === currentUser.id
        )}
      />
      <div className="mt-10">
        <CommentForm
          reviewId={review.id}
          comment={reviewComment}
          handleEdit={handleEdit}
        />
      </div>
      <div className="mt-10">
        <CommentList reviewId={review.id} handleEdit={handleEdit} />
      </div>
    </div>
  );
};
