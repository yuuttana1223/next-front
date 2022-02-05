import { ReviewForm } from "src/components/Form/ReviewForm";
import { useReview } from "src/hooks/useReview";
import { Loader } from "src/components/Loader";
import { ErrorMessage } from "src/components/Message/ErrorMessage";
export const EditReview = () => {
  const { review, reviewLoading, reviewError } = useReview();

  if (reviewLoading) {
    return <Loader />;
  }

  if (reviewError) {
    return <ErrorMessage message={reviewError.message} />;
  }

  return (
    <div>
      <ReviewForm review={review} />
    </div>
  );
};
