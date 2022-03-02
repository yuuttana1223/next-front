import Link from "next/link";
import { VFC } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";

type Props = {
  href: string;
};

export const NewButtonLink: VFC<Props> = (props) => {
  return (
    <Link href={props.href}>
      <a className="inline-block p-2 text-xl text-center text-white bg-emerald-400 hover:bg-emerald-500 rounded-full shadow-sm md:p-3 md:rounded-3xl">
        <HiOutlinePlusSm title="新規投稿ボタン" size={28} className="inline" />
        <span className="hidden align-bottom md:inline">新規投稿</span>
      </a>
    </Link>
  );
};
