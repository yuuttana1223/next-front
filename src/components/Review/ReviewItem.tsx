import { VFC, useContext, useState, useCallback } from "react";
import { Review } from "src/types/review";

import { HiHeart, HiBookmark, HiOutlineChat } from "react-icons/hi";
import { AuthContext } from "src/providers/AuthProvider";
import Link from "next/link";
import { PATH } from "src/urls/path";
import { EditButton } from "src/components/shared/Button/EditButton";
import { DeleteButton } from "src/components/shared/Button/DeleteButton";
import { DeleteModal } from "src/components/Modal/DeleteModal";
import { deleteReview } from "src/apis/review";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { API_URL } from "src/urls/api";
import { useAllReviews } from "src/hooks/useAllReviews";
import toast from "react-hot-toast";

type Props = {
  review?: Review;
  isEditPage?: boolean;
};

export const ReviewItem: VFC<Props> = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const { reviews } = useAllReviews();

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const router = useRouter();
  const { mutate } = useSWRConfig();

  const handleDelete = () => {
    return deleteReview(props.review?.id)
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
  };
  return (
    <div className="p-4 w-full md:w-1/2 lg:w-1/3">
      <div>
        <div className="overflow-hidden h-full rounded-lg border-2 shadow">
          <div className="p-6">
            <h2 className="pb-1 mb-3 text-lg text-gray-900 border-b-2">
              <Link href={`${PATH.REVIEWS.SHOW(props.review?.id)}`}>
                <a className="inline-block font-bold text-blue-500 hover:text-blue-700">
                  {props.review?.lecture_name}
                </a>
              </Link>
            </h2>
            <div className="p-3 -mx-3 mb-3 leading-relaxed rounded-lg shadow">
              <p>
                <span className="mr-1 font-semibold">担当教員:</span>
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

            <div className="flex my-2 text-center">
              <button className="rounded-full cursor-pointer">
                <HiHeart
                  title="いいねボタン"
                  size="24px"
                  className="text-gray-400"
                />
                <span className="text-xs">2</span>
              </button>
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
