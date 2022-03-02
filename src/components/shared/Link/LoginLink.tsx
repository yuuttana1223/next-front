import Link from "next/link";
import { ReactNode, VFC } from "react";

type Props = {
  href: string;
  children: ReactNode;
};

export const LoginLink: VFC<Props> = (props) => {
  return (
    <Link href={props.href}>
      <a className="p-2 text-center text-white bg-blue-500 hover:bg-blue-600 rounded focus:outline-none md:px-4">
        {props.children}
      </a>
    </Link>
  );
};
