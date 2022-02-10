import { VFC, useContext } from "react";
import { ReviewItem } from "src/components/Review/ReviewItem";
import { NewButtonLink } from "src/components/shared/Link/NewButtonLink";
import { useAllReviews } from "src/hooks/useAllReviews";
import { Loader } from "src/components/Loader";
import { ErrorMessage } from "src/components/Message/ErrorMessage";
import { useAllLikes } from "src/hooks/useAllLikes";
import { useAllComments } from "src/hooks/useAllComments";
import { useAllFavorites } from "src/hooks/useAllFavorites";
import { AuthContext } from "src/providers/AuthProvider";

export const Reviews: VFC = () => {
  const { reviews, reviewsError } = useAllReviews();
  const { likes, likesError } = useAllLikes();
  const { comments, commentsError } = useAllComments();
  const { favorites, favoritesError } = useAllFavorites();
  const { currentUser } = useContext(AuthContext);

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

  if (!reviews || !comments || !likes || !favorites) {
    return <Loader />;
  }

  return (
    <div>
      <div className="fixed right-6 bottom-6 md:right-10 md:bottom-10">
        <NewButtonLink />
      </div>
      <div className="flex flex-wrap -m-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 w-full md:w-1/2 lg:w-1/3">
            <ReviewItem
              review={review}
              likes={likes.filter((like) => review.id === like.review_id)}
              comments={comments.filter(
                (comment) => comment.review_id === review.id
              )}
              isFavorite={favorites.some(
                (favorite) =>
                  favorite.user_id === currentUser?.id &&
                  favorite.review_id === review.id
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
