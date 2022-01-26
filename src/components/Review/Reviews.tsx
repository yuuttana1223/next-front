import { VFC } from "react";
import { ReviewItem } from "src/components/Review/ReviewItem";
import { NewButtonLink } from "src/components/shared/Link/NewButtonLink";
import { useAllReviews } from "src/hooks/useAllReviews";
import { Loader } from "src/components/Loader";
import { ErrorMessage } from "../Message/ErrorMessage";

export const Reviews: VFC = () => {
  const { reviews, reviewsError, loading } = useAllReviews();

  if (loading) {
    return <Loader />;
  }

  if (reviewsError) {
    return <ErrorMessage message={reviewsError.message} className="text-xl" />;
  }

  return (
    <div>
      <div className="fixed right-6 bottom-6 md:right-10 md:bottom-10">
        <NewButtonLink />
      </div>
      <div className="flex flex-wrap -m-4">
        {reviews?.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};
