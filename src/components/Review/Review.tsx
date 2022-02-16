/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { VFC, useState, useCallback } from "react";
import { ReviewItem } from "src/components/Review/ReviewItem";
import { Loader } from "src/components/Loader";
import { ErrorMessage } from "src/components/Message/ErrorMessage";
import { useRouter } from "next/router";
import { CommentList } from "src/components/Comment/CommentList";
import { CommentForm } from "src/components/Form/CommentForm";
import { useAllFavorites } from "src/hooks/useAllFavorites";
import { useAllReviews } from "src/hooks/useAllReviews";
import { useAllLikes } from "src/hooks/useAllLikes";
import { useAllComments } from "src/hooks/useAllComments";

export type CommentState = {
  id?: number;
  body?: string;
};

export const Review: VFC = () => {
  const { reviews, reviewsError, reviewsLoading } = useAllReviews();
  const router = useRouter();
  const reviewId = Number(router.query.id);
  const { likesError, likesLoading } = useAllLikes();
  const { favoritesError, favoritesLoading } = useAllFavorites();
  const { commentsError, commentsLoading } = useAllComments();
  const [reviewComment, setReviewComment] = useState<CommentState>({
    id: undefined,
    body: "",
  });

  const handleEdit = useCallback((commentId?: number, body?: string) => {
    setReviewComment({
      id: commentId,
      body: body,
    });
  }, []);

  if (reviewsLoading || likesLoading || favoritesLoading || commentsLoading) {
    return <Loader />;
  }

  if (reviewsError) {
    return <ErrorMessage message={reviewsError.message} className="text-xl" />;
  }

  if (likesError) {
    return <ErrorMessage message={likesError.message} className="text-xl" />;
  }

  if (favoritesError) {
    return (
      <ErrorMessage message={favoritesError.message} className="text-xl" />
    );
  }

  if (commentsError) {
    return <ErrorMessage message={commentsError.message} className="text-xl" />;
  }

  return (
    <div className="p-4 -m-4 mx-auto w-full md:w-3/5 lg:w-2/5">
      <ReviewItem
        review={reviews!.find((review) => review.id === reviewId)!}
        isEditable
      />
      <div className="mt-10">
        <CommentForm comment={reviewComment} handleEdit={handleEdit} />
      </div>
      <div className="mt-10">
        <CommentList handleEdit={handleEdit} />
      </div>
    </div>
  );
};
