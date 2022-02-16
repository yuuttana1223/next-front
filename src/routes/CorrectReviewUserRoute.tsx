import { VFC, ReactNode, useContext, useEffect } from "react";
import { AuthContext } from "src/providers/AuthProvider";
import { useRouter } from "next/router";
import { PATH } from "src/urls/path";
import { useAllReviews } from "src/hooks/useAllReviews";

export const CorrectReviewUserRoute: VFC<{ children: ReactNode }> = (props) => {
  const router = useRouter();
  const reviewId = Number(router.query.id);
  const { reviews } = useAllReviews();
  const review = reviews?.find((review) => review.id === reviewId);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (review && currentUser?.id !== review.user_id) {
      router.push(`${PATH.REVIEWS.SHOW(review?.id)}`);
    }
  }, [currentUser, review, router]);

  if (currentUser?.id === review?.user_id) {
    return <>{props.children}</>;
  }

  return <></>;
};
