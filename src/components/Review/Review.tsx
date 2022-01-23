import { VFC } from "react";
import { ReviewItem } from "src/components/Review/ReviewItem";
import { useReview } from "src/hooks/useReview";
import { Loader } from "src/components/Loader";

export const Review: VFC = () => {
  const { review, loading, reviewError } = useReview();

  if (loading) {
    return <Loader />;
  }

  if (reviewError) {
    return <div>{reviewError.message}</div>;
  }

  return (
    <div className="flex justify-center -m-4">
      <ReviewItem review={review} isEditPage />
    </div>
  );
};
