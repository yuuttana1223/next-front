import { VFC } from "react";
import { Review } from "src/types/review";
import { API_URL } from "src/urls/api";
import { fetcher } from "src/utils/fetcher";
import useSWR from "swr";
import { ReviewItem } from "src/components/Review/ReviewItem";

export const ReviewList: VFC = () => {
  const { data: reviews, error } = useSWR<Review[], Error>(
    `${API_URL}/reviews`,
    fetcher
  );

  if (!reviews && !error) {
    return <div>ローディング中</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="flex flex-wrap -m-4">
      {reviews?.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};
