import { VFC, useState, useCallback } from "react";
import { ReviewItem } from "src/components/Review/ReviewItem";
import { useReview } from "src/hooks/useReview";
import { Loader } from "src/components/Loader";
import { ErrorMessage } from "src/components/Message/ErrorMessage";
import { useLikes } from "src/hooks/useLikes";
import { useRouter } from "next/router";
import { CommentList } from "src/components/Comment/CommentList";
import { CommentForm } from "src/components/Form/CommentForm";
import { Comment } from "src/apis/reviewComment";
import { useReviewComments } from "src/hooks/useReviewComments";

export type CommentState = {
  id?: number;
  body?: string;
};

export const Review: VFC = () => {
  const { review, reviewLoading, reviewError } = useReview();
  const router = useRouter();
  const { likes, likesError, likesLoading } = useLikes(router.query.id);
  const { comments } = useReviewComments(review?.id);
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

  if (reviewLoading || likesLoading) {
    return <Loader />;
  }

  if (reviewError) {
    return <ErrorMessage message={reviewError.message} className="text-xl" />;
  }

  if (likesError) {
    return <ErrorMessage message={likesError.message} className="text-xl" />;
  }

  return (
    <div className="p-4 -m-4 mx-auto w-full md:w-3/5 lg:w-2/5">
      <ReviewItem
        review={review}
        likes={likes}
        isEditPage
        comments={comments}
      />
      <div className="mt-10">
        <CommentForm
          reviewId={review?.id}
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
