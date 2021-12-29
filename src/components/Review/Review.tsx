import { VFC } from "react";
import { BackLink } from "src/components/shared/Link/BackLink";
import { API_URL } from "src/urls/api";
import { PATH } from "src/urls/path";
import { fetcher } from "src/utils/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Review as ReviewType } from "src/types/review";
import { ReviewItem } from "src/components/Review/ReviewItem";

export const Review: VFC = () => {
  const router = useRouter();

  const { data: review, error } = useSWR<ReviewType, Error>(
    router.query.id ? `${API_URL}/reviews/${router.query.id}` : null,
    fetcher
  );

  if (!review && !error) {
    return <div>ローディング中</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <BackLink href={PATH.ROOT} />
      <div className="flex justify-center -m-4">
        <ReviewItem review={review} />
      </div>
    </div>
  );
};
