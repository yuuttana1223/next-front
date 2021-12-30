import Link from "next/link";
import { VFC } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { PATH } from "src/urls/path";

export const NewButtonLink: VFC = () => {
  return (
    <Link href={PATH.REVIEWS.NEW}>
      <a className="inline-block p-2 text-xl text-center text-white bg-green-400 shadow-sm rounded-3xl hover:bg-green-500">
        <HiOutlinePlusSm title="新規投稿ボタン" size={28} className="inline" />
        <span className="hidden align-bottom md:inline">新規投稿</span>
      </a>
    </Link>
  );
};
