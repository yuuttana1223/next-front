import { VFC } from "react";
import { ReviewItem } from "src/components/Review/ReviewItem";
import { useReview } from "src/hooks/useReview";
import { Loader } from "src/components/Loader";
import { ErrorMessage } from "src/components/Message/ErrorMessage";

export const Review: VFC = () => {
  const { review, loading, reviewError } = useReview();

  if (loading) {
    return <Loader />;
  }

  if (reviewError) {
    return <ErrorMessage message={reviewError.message} className="text-xl" />;
  }

  return (
    <div className="flex justify-center -m-4">
      <ReviewItem review={review} isEditPage />
    </div>
  );
};
