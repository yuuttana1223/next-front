import { VFC } from "react";
import { ReviewItem } from "src/components/Review/ReviewItem";
import { useReview } from "src/hooks/useReview";
import { Loader } from "src/components/Loader";
import { ErrorMessage } from "src/components/Message/ErrorMessage";
import { useLikes } from "src/hooks/useLikes";
import { useRouter } from "next/router";

export const Review: VFC = () => {
  const { review, reviewLoading, reviewError } = useReview();
  const router = useRouter();
  const { likes, likesError, likesLoading } = useLikes(router.query.id);

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
    <div className="flex justify-center -m-4">
      <ReviewItem review={review} likes={likes} isEditPage />
    </div>
  );
};
