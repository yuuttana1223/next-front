import Link from "next/link";
import { VFC } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";

type Props = {
  href: string;
};

export const BackLink: VFC<Props> = (props) => {
  return (
    <Link href={props.href}>
      <a className="text-green-500 hover:text-green-400">
        <HiOutlineArrowLeft title="戻るボタン" size="20px" className="inline" />
        <span className="ml-1">戻る</span>
      </a>
    </Link>
  );
};
