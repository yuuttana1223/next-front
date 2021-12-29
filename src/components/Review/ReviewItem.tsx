import { VFC, useContext } from "react";
import { Review } from "src/types/review";

import { HiHeart, HiBookmark, HiOutlineChat } from "react-icons/hi";
import { AuthContext } from "src/providers/AuthProvider";
import Link from "next/link";
import { PATH } from "src/urls/path";

type Props = {
  review: Review;
};

export const ReviewItem: VFC<Props> = (props) => {
  const { authState } = useContext(AuthContext);

  return (
    <div className="w-full p-4 md:w-1/2 lg:w-1/3">
      <div>
        <div className="h-full overflow-hidden border-2 border-gray-200 rounded-lg shadow hover:bg-gray-50">
          <div className="p-6">
            <h2 className="pb-1 mb-3 text-lg text-gray-900 border-b-2">
              <Link href={`${PATH.REVIEWS.SHOW(props.review.id)}`}>
                <a className="inline-block font-bold text-blue-600 border-b-2 border-blue-600 hover:text-blue-400 hover:border-blue-400">
                  {props.review.lecture_name} ({props.review.teacher_name}先生)
                </a>
              </Link>
            </h2>
            <div className="p-3 mb-3 -mx-3 leading-relaxed rounded-lg shadow">
              <p>
                <span className="mr-1 font-semibold">内容充実度:</span>
                {props.review.adequacy}
              </p>
              <p>
                <span className="mr-1 font-semibold">課題の量:</span>
                {props.review.submission_quantity}
              </p>
              <p>
                <span className="mr-1 font-semibold">難易度:</span>
                {props.review.difficulty}
              </p>
              <p>
                <span className="mr-1 font-semibold">期末テスト:</span>
                {props.review.is_ending_test ? "あり" : "なし"}
              </p>
              <p>
                <span className="mr-1 font-semibold">授業形式:</span>
                {props.review.lesson_type}
              </p>
            </div>
            <div className="p-3 mb-3 -mx-3 leading-relaxed rounded-lg shadow ">
              <p className="font-semibold">内容:</p>
              {authState.isSignedIn ? (
                <div>{props.review.content}</div>
              ) : (
                <div className="text-center">
                  <Link href={PATH.USERS.SIGN_IN}>
                    <a className="cursor-pointer">続きを見る</a>
                  </Link>
                </div>
              )}
            </div>
            <div className="text-sm text-right text-gray-400">
              <HiOutlineChat
                title="コメント数"
                size="24px"
                className="inline"
              />
              <span className="ml-1">コメント数: 2</span>
            </div>
          </div>
        </div>
        <div className="flex mt-1 text-center">
          <button className="rounded-full cursor-pointer">
            <HiHeart
              title="いいねボタン"
              size="24px"
              className="text-gray-400"
            />
            <span className="text-xs">2</span>
          </button>
          <button className="p-2 ml-auto border-2 cursor-pointer ">
            <HiBookmark
              title="お気に入りボタン"
              size="24px"
              className="inline text-pink-300"
            />
            お気に入りに追加
          </button>
        </div>
      </div>
    </div>
  );
};
