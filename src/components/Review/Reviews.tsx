import { VFC, useState, useEffect, useCallback } from "react";
import { ReviewCard } from "src/components/Review/ReviewCard";
import { NewButtonLink } from "src/components/shared/Link/NewButtonLink";
import { useAllReviews } from "src/hooks/useAllReviews";
import { Loader } from "src/components/Loader";
import { ErrorMessage } from "src/components/Message/ErrorMessage";
import { useAllLikes } from "src/hooks/useAllLikes";
import { useAllComments } from "src/hooks/useAllComments";
import { useAllFavorites } from "src/hooks/useAllFavorites";
import { SortSelect } from "src/components/shared/Select/SortSelect";
import { fetchReviews, selects, Review, SelectType } from "src/apis/review";
import { useRouter } from "next/router";

export type SelectStateType = {
  reviews?: Review[];
  select?: SelectType;
};

export const Reviews: VFC = () => {
  const { reviews, reviewsError, reviewsLoading } = useAllReviews();
  const { likesError, likesLoading } = useAllLikes();
  const { commentsError, commentsLoading } = useAllComments();
  const { favoritesError, favoritesLoading } = useAllFavorites();
  const [selectState, setSelectState] = useState<SelectStateType>({
    reviews,
    select: selects[0],
  });
  const router = useRouter();
  const sortSelect = useCallback((reviews: Review[], select?: SelectType) => {
    setSelectState({
      reviews,
      select,
    });
  }, []);

  useEffect(() => {
    if (router.query.sort_by || router.query.search_query) {
      fetchReviews(router.asPath).then((res) => {
        sortSelect(
          res.data,
          selects.find(
            (select) =>
              select.sortBy === Object.values(router.query)[0] &&
              select.value === Object.values(router.query)[1]
          ) ?? selects[0]
        );
      });
    } else {
      setSelectState({
        reviews,
        select: selects[0],
      });
    }
  }, [
    reviews,
    router.asPath,
    router.query,
    router.query.sort_by,
    router.query.value,
    sortSelect,
  ]);

  if (reviewsLoading || likesLoading || commentsLoading || favoritesLoading) {
    return <Loader />;
  }

  if (reviewsError) {
    return <ErrorMessage message={reviewsError.message} className="text-xl" />;
  }

  if (likesError) {
    return <ErrorMessage message={likesError.message} className="text-xl" />;
  }

  if (commentsError) {
    return <ErrorMessage message={commentsError.message} className="text-xl" />;
  }

  if (favoritesError) {
    return (
      <ErrorMessage message={favoritesError.message} className="text-xl" />
    );
  }

  return (
    <div>
      <div className="mb-10">
        <SortSelect
          selects={selects}
          state={selectState}
          sortSelect={sortSelect}
        />
      </div>
      <div className="fixed right-6 bottom-6 md:right-10 md:bottom-10">
        <NewButtonLink />
      </div>
      <div className="flex flex-wrap -m-4">
        {selectState.reviews?.map((review) => (
          <div key={review.id} className="p-4 w-full md:w-1/2 lg:w-1/3">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </div>
  );
};
