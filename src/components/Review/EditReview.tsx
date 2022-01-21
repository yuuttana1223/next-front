import { ReviewForm } from "src/components/Form/ReviewForm";
import { useReview } from "src/hooks/useReview";
export const EditReview = () => {
  const { review } = useReview();

  return (
    <div>
      <ReviewForm review={review} />
    </div>
  );
};
