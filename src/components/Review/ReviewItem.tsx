/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { VFC, useContext, useState, useCallback } from "react";
import { HiHeart, HiBookmark, HiOutlineChat } from "react-icons/hi";
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
import { deleteLike, Like, postLike } from "src/apis/like";
import { useAllLikes } from "src/hooks/useAllLikes";

type Props = {
  review?: Review;
  likes?: Like[];
  isEditPage?: boolean;
};

export const ReviewItem: VFC<Props> = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const { reviews } = useAllReviews();
  const format = intlFormat;
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { likes } = useAllLikes();
  const [likeState, setLikeState] = useState({
    likes: props.likes?.map((like) => {
      return {
        userId: like.user_id,
        reviewId: like.review_id,
      };
    }),
    isLiked: props.likes?.some((like) => like.user_id === currentUser?.id),
  });

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleDelete = useCallback(() => {
    deleteReview(props.review?.id)
      .then(() => {
        mutate(
          `${API_URL}/reviews`,
          reviews?.filter((review) => review.id !== props.review?.id)
        );
        mutate(`${API_URL}/reviews/${props.review?.id}`);
        toast.success("レビューを削除しました", {
          duration: 10000,
        });
        router.push(PATH.ROOT);
      })
      .catch(() => {
        toast.error("レビュー削除に失敗しました");
      });
  }, [props.review, reviews, mutate, router]);

  const handleLike = useCallback(() => {
    if (props.review) {
      const reviewId = props.review.id;
      if (likeState.isLiked) {
        setLikeState((prevLikeState) => {
          return {
            likes: prevLikeState.likes?.filter(
              (like) => like.userId !== currentUser?.id
            ),
            isLiked: false,
          };
        });
        deleteLike(reviewId)
          .then(() => {
            mutate(
              `${API_URL}/reviews/${reviewId}/likes`,
              likeState.likes?.filter((like) => like.userId !== currentUser?.id)
            );
            mutate(
              `${API_URL}/likes`,
              likes?.filter(
                (like) =>
                  like.review_id !== reviewId &&
                  like.user_id !== currentUser?.id
              )
            );
          })
          .catch(() => {
            toast.error("いいね解除に失敗しました");
          });
      } else {
        setLikeState((prevLikeState) => {
          return {
            likes: [
              ...prevLikeState.likes!,
              {
                userId: currentUser!.id,
                reviewId: reviewId,
              },
            ],
            isLiked: true,
          };
        });
        postLike(reviewId)
          .then((res) => {
            mutate(`${API_URL}/reviews/${reviewId}/likes`, [
              ...likeState.likes!,
              res.data,
            ]);
            mutate(`${API_URL}/likes`, [...likes!, res.data]);
          })
          .catch(() => {
            toast.error("いいねに失敗しました");
          });
      }
    }
  }, [
    props.review,
    likeState.isLiked,
    likeState.likes,
    currentUser,
    mutate,
    likes,
  ]);

  return (
    <div className="p-4 w-full md:w-1/2 lg:w-1/3">
      <div className="text-gray-900">
        <div className="overflow-hidden h-full rounded-lg border-2 shadow">
          <div className="p-6">
            <h2 className="pb-1 mb-3 text-lg border-b-2">
              <Link href={`${PATH.REVIEWS.SHOW(props.review?.id)}`}>
                <a
                  className={`inline-block font-bold ${
                    props.isEditPage ? "" : "text-blue-500 hover:text-blue-700"
                  }`}
                >
                  {props.review?.lecture_name}
                </a>
              </Link>
            </h2>
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
                props.isEditPage ? "break-words" : "truncate"
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
                      <a className="cursor-pointer">続きを見る</a>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-1 text-sm text-gray-700">
              <time>
                {props.review &&
                  format(Date.parse(props.review.created_at), {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
              </time>
              <p>
                <span className="mr-1 font-semibold text-gray-900">
                  投稿者:
                </span>
                {props.review?.username}
              </p>
            </div>

            <div className="flex my-2 text-center">
              {currentUser ? (
                <button
                  onClick={handleLike}
                  className="rounded-full cursor-pointer"
                >
                  <HiHeart
                    title="いいねボタン"
                    size="24px"
                    className={`${
                      likeState.isLiked ? "text-red-400" : "text-gray-400"
                    }`}
                  />
                  <span className="text-xs">{likeState.likes?.length}</span>
                </button>
              ) : (
                <Link href={PATH.USERS.SIGN_IN}>
                  <a>
                    <HiHeart
                      title="いいねボタン"
                      size="24px"
                      className={`${
                        likeState.isLiked ? "text-red-400" : "text-gray-400"
                      }`}
                    />
                    <span className="text-xs">{likeState.likes?.length}</span>
                  </a>
                </Link>
              )}

              <button className="p-2 ml-auto border-2 shadow cursor-pointer">
                <HiBookmark
                  title="お気に入りボタン"
                  size="24px"
                  className="inline text-pink-300"
                />
                <span className="align-bottom">ブックマーク</span>
              </button>
            </div>
            {props.isEditPage && currentUser?.id === props.review?.user_id && (
              <div className="my-2 space-x-2">
                <EditButton href={PATH.REVIEWS.EDIT(props.review?.id)} />
                <DeleteButton onClick={openModal} />
                <DeleteModal
                  closeModal={closeModal}
                  isOpen={isOpen}
                  handleDelete={handleDelete}
                />
              </div>
            )}

            <div className="text-sm text-right text-gray-400">
              <HiOutlineChat
                title="コメント数"
                size="24px"
                className="inline"
              />
              <span className="ml-1 align-bottom">コメント数: 2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
