import { VFC } from "react";
import { Review } from "src/types/review";
import { API_URL } from "src/urls/api";
import { fetcher } from "src/utils/fetcher";
import useSWRImmutable from "swr/immutable";
import { ReviewItem } from "src/components/Review/ReviewItem";
import { NewButtonLink } from "src/components/shared/Link/NewButtonLink";

export const Reviews: VFC = () => {
  const { data: reviews, error } = useSWRImmutable<Review[], Error>(
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
    <div>
      <div className="flex justify-end mb-10">
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
