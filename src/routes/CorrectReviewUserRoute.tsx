import { VFC, ReactNode, useContext, useEffect } from "react";
import { AuthContext } from "src/providers/AuthProvider";
import { useReview } from "src/hooks/useReview";
import { useRouter } from "next/router";
import { PATH } from "src/urls/path";

export const CorrectReviewUserRoute: VFC<{ children: ReactNode }> = (props) => {
  const { currentUser } = useContext(AuthContext);
  const { review } = useReview();
  const router = useRouter();

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
