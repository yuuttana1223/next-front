import Link from "next/link";
import { VFC } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { PATH } from "src/urls/path";

export const NewButtonLink: VFC = () => {
  return (
    <Link href={PATH.REVIEWS.NEW}>
      <a className="inline-block p-2 text-xl text-center text-white bg-emerald-400 hover:bg-emerald-500 rounded-full shadow-sm md:p-3 md:rounded-3xl">
        <HiOutlinePlusSm title="新規投稿ボタン" size={28} className="inline" />
        <span className="hidden align-bottom md:inline">新規投稿</span>
      </a>
    </Link>
  );
};
