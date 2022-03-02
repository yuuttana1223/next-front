import { ReviewForm } from "src/components/Form/ReviewForm";
import { Loader } from "src/components/Loader";
import { ErrorMessage } from "src/components/Message/ErrorMessage";
import { useAllReviews } from "src/hooks/useAllReviews";
import { useRouter } from "next/router";
export const EditReview = () => {
  const { reviews, reviewsError, reviewsLoading } = useAllReviews();
  const router = useRouter();
  const reviewId = Number(router.query.id);

  if (reviewsLoading) {
    return <Loader />;
  }

  if (reviewsError) {
    return <ErrorMessage message={reviewsError.message} />;
  }

  return (
    <div>
      <ReviewForm review={reviews?.find((review) => review.id === reviewId)} />
    </div>
  );
};
