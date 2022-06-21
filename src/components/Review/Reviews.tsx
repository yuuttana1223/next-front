import {
  VFC,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";
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
import { PATH } from "src/urls/path";
import { Pagination } from "src/components/Pagination";
import { AuthContext } from "src/providers/AuthProvider";
import { STATUS_CODE } from "src/utils/statusCode";

export type SelectStateType = {
  reviews?: Review[];
  select?: SelectType;
};

const PER_PAGE = 12;

export const Reviews: VFC = () => {
  const { reviews, reviewsError, reviewsLoading } = useAllReviews();
  const { likesError, likesLoading } = useAllLikes();
  const { commentsError, commentsLoading } = useAllComments();
  const { favoritesError, favoritesLoading } = useAllFavorites();
  const { currentUser } = useContext(AuthContext);
  const [sortLoading, setLoading] = useState(false);
  const [selectState, setSelectState] = useState<SelectStateType>({
    reviews,
    select: selects[0],
  });
  const router = useRouter();
  const currentPage = useMemo(
    () => (router.query.page ? Number(router.query.page) : 1),
    [router.query.page]
  );

  // パラメータが複数の場合も考慮するため?と&を区別
  const queryParams = useMemo(
    () =>
      router.asPath.split("?page")[0] === PATH.ROOT
        ? "?"
        : `${router.asPath.split("&page")[0]}&`,
    [router.asPath]
  );

  const handleNextPage = useCallback(() => {
    if (
      !selectState ||
      !selectState.reviews ||
      selectState.reviews.length <= currentPage * PER_PAGE
    ) {
      return;
    }
    router.push(`${queryParams}page=${currentPage + 1}`);
  }, [currentPage, queryParams, router, selectState]);

  const handleBackPage = useCallback(() => {
    if (currentPage <= 1) {
      return;
    }
    router.push(`${queryParams}page=${currentPage - 1}`);
  }, [currentPage, queryParams, router]);

  const sortSelect = useCallback((reviews: Review[], select?: SelectType) => {
    setSelectState({
      reviews,
      select,
    });
  }, []);

  // 1ページあたりのレビューを取得
  const separatePage = useCallback(
    (reviews?: Review[]) => {
      return reviews?.slice(
        currentPage === 1 ? 0 : (currentPage - 1) * PER_PAGE,
        currentPage * PER_PAGE
      );
    },
    [currentPage]
  );

  useEffect(() => {
    if (router.query.sort_by || router.query.search_query) {
      setLoading(true);
      fetchReviews(router.asPath)
        .then((res) => {
          if (res.status === STATUS_CODE.OK) {
            sortSelect(
              res.data,
              selects.find(
                (select) =>
                  select.sortBy === Object.values(router.query)[0] &&
                  select.value === Object.values(router.query)[1]
              ) ?? selects[0]
            );
          }
        })
        .finally(() => {
          setLoading(false);
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

  if (
    reviewsLoading ||
    likesLoading ||
    commentsLoading ||
    favoritesLoading ||
    sortLoading
  ) {
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
        {router.query.search_query && (
          <p className="mt-6 -mb-8 text-2xl text-gray-900 break-words">
            {router.query.search_query}の検索結果
          </p>
        )}
        {!selectState.reviews?.length && (
          <p className="mt-16 text-gray-900">
            該当するレビューが見つかりません
          </p>
        )}
      </div>
      <div className="fixed right-6 bottom-6 md:right-10 md:bottom-10">
        <NewButtonLink
          href={currentUser ? PATH.REVIEWS.NEW : PATH.USERS.SIGN_IN}
        />
      </div>
      <div className="flex flex-wrap -m-4">
        {selectState.reviews?.length
          ? separatePage(selectState.reviews)?.map((review) => (
              <div key={review.id} className="p-4 w-full md:w-1/2 lg:w-1/3">
                <ReviewCard review={review} />
              </div>
            ))
          : ""}
      </div>
      <div className="mt-10">
        <Pagination
          pageCount={
            selectState.reviews
              ? Math.ceil(selectState.reviews?.length / PER_PAGE)
              : 1
          }
          currentPage={currentPage}
          queryParams={queryParams}
          handleBackPage={handleBackPage}
          handleNextPage={handleNextPage}
        />
      </div>
    </div>
  );
};
