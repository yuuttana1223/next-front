import { VFC } from "react";
import { ReviewCard } from "src/components/Review/ReviewCard";
import { Loader } from "src/components/Loader";
import { ErrorMessage } from "src/components/Message/ErrorMessage";
import { useAllLikes } from "src/hooks/useAllLikes";
import { useAllComments } from "src/hooks/useAllComments";
import { useAllFavorites } from "src/hooks/useAllFavorites";
import { useRouter } from "next/router";
import { useFavoriteReviews } from "src/hooks/useFavoriteReviews";

export const FavoriteReviews: VFC = () => {
  const router = useRouter();
  const { favoriteReviews, favoriteReviewsError, favoriteReviewsLoading } =
    useFavoriteReviews(router.query.id);
  const { likesError, likesLoading } = useAllLikes();
  const { commentsError, commentsLoading } = useAllComments();
  const { favoritesError, favoritesLoading } = useAllFavorites();
  if (
    favoriteReviewsLoading ||
    likesLoading ||
    commentsLoading ||
    favoritesLoading
  ) {
    return <Loader />;
  }

  if (favoriteReviewsError) {
    return (
      <ErrorMessage
        message={favoriteReviewsError.message}
        className="text-xl"
      />
    );
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
      <h2 className="mb-10 text-2xl font-bold text-gray-900">お気に入り一覧</h2>
      <div className="flex flex-wrap -m-4">
        {favoriteReviews?.map((review) => (
          <div key={review.id} className="p-4 w-full md:w-1/2 lg:w-1/3">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </div>
  );
};
