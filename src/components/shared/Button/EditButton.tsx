import { HiOutlinePencilAlt } from "react-icons/hi";
import { VFC } from "react";
import Link from "next/link";

type Props = {
  href: string;
};

export const EditButton: VFC<Props> = (props) => {
  return (
    <Link href={props.href}>
      <a className="inline-block px-3 py-2 font-bold text-white rounded bg-emerald-500 hover:bg-emerald-600 md:pr-3 md:pl-2">
        <HiOutlinePencilAlt title="編集" size="24px" className="inline" />
        <span className="hidden md:align-bottom md:inline">編集</span>
      </a>
    </Link>
  );
};
