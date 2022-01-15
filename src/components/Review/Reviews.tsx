import { VFC } from "react";
import { ReviewItem } from "src/components/Review/ReviewItem";
import { NewButtonLink } from "src/components/shared/Link/NewButtonLink";
import { useAllReviews } from "src/hooks/useAllReviews";

export const Reviews: VFC = () => {
  const { reviews, reviewsError, loading } = useAllReviews();

  if (loading) {
    return <div>ローディング中</div>;
  }

  if (reviewsError) {
    return <div>{reviewsError.message}</div>;
  }

  return (
    <div className="">
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
