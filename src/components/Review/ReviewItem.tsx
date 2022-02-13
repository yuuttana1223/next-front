// 親コンポーネントでreviews, likes, comments, favoritesはundefinedではないことが保証されている
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { VFC, useContext, useState, useCallback } from "react";
import { HiOutlineChat } from "react-icons/hi";
import { AuthContext } from "src/providers/AuthProvider";
import Link from "next/link";
import { PATH } from "src/urls/path";
import { EditButton } from "src/components/shared/Button/EditButton";
import { DeleteButton } from "src/components/shared/Button/DeleteButton";
import { DeleteModal } from "src/components/Modal/DeleteModal";
import { deleteReview, Review } from "src/apis/review";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { API_URL } from "src/urls/api";
import { useAllReviews } from "src/hooks/useAllReviews";
import toast from "react-hot-toast";
import { intlFormat } from "date-fns";
import { deleteLike, postLike } from "src/apis/like";
import { useAllLikes } from "src/hooks/useAllLikes";
import { GoodButton } from "src/components/shared/Button/GoodButton";
import { FavoriteButton } from "src/components/shared/Button/FavoriteButton";
import { deleteFavorite, postFavorite } from "src/apis/favorite";
import { useAllFavorites } from "src/hooks/useAllFavorites";
import { useAllComments } from "src/hooks/useAllComments";

type Props = {
  review: Review;
  isEditable?: boolean;
};

export const ReviewItem: VFC<Props> = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const { reviews } = useAllReviews();
  const format = intlFormat;
  const { mutate } = useSWRConfig();
  const { likes } = useAllLikes();
  const { favorites } = useAllFavorites();
  const { comments } = useAllComments();
  // レビューを削除後props.reviewがundefinedになるので、props.review?にした
  const [likeState, setLikeState] = useState({
    likes: likes!.filter((like) => like.review_id === props.review?.id),
    isLiked: likes!.some(
      (like) =>
        like.review_id === props.review?.id && like.user_id === currentUser?.id
    ),
  });
  const [isFavorite, setIsFavorite] = useState(
    favorites!.some(
      (favorite) =>
        favorite.review_id === props.review?.id &&
        favorite.user_id === currentUser?.id
    )
  );

  const router = useRouter();
  const likeReview = useCallback(
    (reviewId: number) => {
      if (!currentUser) {
        return;
      }
      setLikeState((prevLikeState) => {
        return {
          likes: [
            ...prevLikeState.likes,
            {
              user_id: currentUser.id,
              review_id: reviewId,
            },
          ],
          isLiked: true,
        };
      });
    },
    [currentUser]
  );

  const undoLike = useCallback(() => {
    setLikeState((prevLikeState) => {
      return {
        likes: prevLikeState.likes.filter(
          (like) => like.user_id !== currentUser?.id
        ),
        isLiked: false,
      };
    });
  }, [currentUser?.id]);

  const pushLogin = useCallback(() => {
    router.push(PATH.USERS.SIGN_IN);
  }, [router]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleDelete = useCallback(() => {
    deleteReview(props.review?.id)
      .then(() => {
        mutate(
          `${API_URL}/reviews`,
          reviews?.filter((review) => review.id !== props.review?.id)
        );
        toast.success("レビューを削除しました", {
          duration: 10000,
        });
        router.push(PATH.ROOT);
      })
      .catch(() => {
        toast.error("レビュー削除に失敗しました");
      });
  }, [props.review?.id, mutate, reviews, router]);

  const handleLike = useCallback(() => {
    if (!likes) {
      return;
    }
    const reviewId = props.review?.id;
    if (likeState.isLiked) {
      undoLike();
      deleteLike(reviewId)
        .then(() => {
          mutate(
            `${API_URL}/likes`,
            likes.filter(
              (like) =>
                like.review_id !== reviewId && like.user_id !== currentUser?.id
            )
          );
        })
        .catch(() => {
          likeReview(reviewId);
        });
    } else {
      likeReview(reviewId);
      postLike(reviewId)
        .then((res) => {
          mutate(`${API_URL}/likes`, [...likes, res.data]);
        })
        .catch(() => {
          undoLike();
        });
    }
  }, [
    props.review,
    likeState.isLiked,
    undoLike,
    mutate,
    likes,
    currentUser?.id,
    likeReview,
  ]);

  const handleFavorite = useCallback(() => {
    if (!favorites) {
      return;
    }
    const reviewId = props.review?.id;
    if (isFavorite) {
      setIsFavorite(false);
      deleteFavorite(reviewId)
        .then(() => {
          mutate(`${API_URL}/favorites`, [
            ...favorites.filter((favorite) => favorite.review_id !== reviewId),
          ]);
        })
        .catch(() => {
          setIsFavorite(true);
        });
    } else {
      setIsFavorite(true);
      postFavorite(reviewId)
        .then((res) => {
          mutate(`${API_URL}/favorites`, [...favorites, res.data]);
        })
        .catch(() => {
          setIsFavorite(false);
        });
    }
  }, [favorites, isFavorite, mutate, props.review]);

  return (
    <div className="text-gray-900">
      <div className="overflow-hidden h-full rounded-lg border-2 shadow">
        <h2 className="p-3 pl-6 text-lg border-b-2">
          <Link
            href={
              currentUser
                ? PATH.REVIEWS.SHOW(props.review?.id)
                : PATH.USERS.SIGN_IN
            }
          >
            <a
              className={`inline-block font-bold ${
                props.isEditable
                  ? "cursor-text"
                  : "text-blue-500 hover:text-blue-700"
              }`}
            >
              {props.review?.lecture_name}
            </a>
          </Link>
        </h2>
        <div className="p-6">
          <div className="p-3 -mx-3 mb-3 leading-relaxed rounded-lg shadow">
            <p>
              <span className="mr-1 font-semibold">担当教員:</span>
              <br />
              {props.review?.teacher_name}
            </p>
            <p>
              <span className="mr-1 font-semibold">内容充実度:</span>
              {props.review?.adequacy}
            </p>
            <p>
              <span className="mr-1 font-semibold">課題の量:</span>
              {props.review?.submission_quantity}
            </p>
            <p>
              <span className="mr-1 font-semibold">難易度:</span>
              {props.review?.difficulty}
            </p>
            <p>
              <span className="mr-1 font-semibold">期末テスト:</span>
              {props.review?.is_ending_test ? "あり" : "なし"}
            </p>
            <p>
              <span className="mr-1 font-semibold">授業形式:</span>
              {props.review?.lesson_type}
            </p>
          </div>
          <div
            className={`p-3 mb-3 -mx-3 leading-relaxed rounded-lg shadow ${
              props.isEditable ? "break-words" : "truncate"
            }`}
          >
            <p className="font-semibold ">内容:</p>
            {currentUser ? (
              <span>{props.review?.content}</span>
            ) : (
              <div>
                <span>
                  {props.review?.content.substring(0, 20)}
                  {props.review?.content.length &&
                    props.review?.content.length > 20 &&
                    "..."}
                </span>
                <div className="text-center">
                  <Link href={PATH.USERS.SIGN_IN}>
                    <a className="hover:text-gray-700 cursor-pointer ">
                      続きを見る
                    </a>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-1 text-sm text-gray-700">
            <time>
              {props.review &&
                `${format(Date.parse(props.review?.created_at), {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })} ${
                  props.review.created_at !== props.review.updated_at &&
                  "(編集済み)"
                }`}
            </time>
            <p>
              <span className="mr-1 font-semibold text-gray-900">投稿者:</span>
              {props.review?.username}
            </p>
          </div>

          <div className="flex justify-between my-2">
            <GoodButton
              onClick={currentUser ? handleLike : pushLogin}
              count={likeState.likes?.length}
              isLiked={likeState.isLiked}
            />
            <FavoriteButton
              onClick={currentUser ? handleFavorite : pushLogin}
              isFavorite={isFavorite}
            />
          </div>
          {props.isEditable && currentUser?.id === props.review?.user_id && (
            <div className="mt-4 space-x-2">
              <EditButton href={PATH.REVIEWS.EDIT(props.review?.id)} />
              <DeleteButton onClick={openModal} />
              <DeleteModal
                isOpen={isOpen}
                message="レビューを完全に削除しますか？付随するコメントも一緒に削除されます。"
                closeModal={closeModal}
                handleDelete={handleDelete}
              />
            </div>
          )}
        </div>
        <div className="p-3 text-sm text-right text-gray-400 border-t-2">
          <HiOutlineChat title="コメント数" size="24px" className="inline" />
          <span className="ml-1 align-bottom">
            コメント数:{" "}
            {
              comments?.filter(
                (comment) => comment.review_id === props.review?.id
              ).length
            }
          </span>
        </div>
      </div>
    </div>
  );
};
