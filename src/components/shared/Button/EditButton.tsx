import { HiOutlinePencilAlt } from "react-icons/hi";
import { VFC } from "react";
import Link from "next/link";

type Props = {
  href: string;
};

export const EditButton: VFC<Props> = (props) => {
  return (
    <Link href={props.href}>
      <a className="inline-block py-2 px-3 font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded md:pr-3 md:pl-2">
        <HiOutlinePencilAlt title="編集" size="24px" className="inline" />
        <span className="hidden md:inline md:align-bottom">編集</span>
      </a>
    </Link>
  );
};
