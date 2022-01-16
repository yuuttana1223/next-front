import { BackLink } from "src/components/shared/Link/BackLink";
import { PATH } from "src/urls/path";
import { ReviewForm } from "src/components/Form/ReviewForm";
import { useReview } from "src/hooks/useReview";
export const EditReview = () => {
  const { review } = useReview();

  return (
    <div>
      <div className="mb-4">
        <BackLink href={PATH.ROOT} />
      </div>
      <ReviewForm review={review} />
    </div>
  );
};
