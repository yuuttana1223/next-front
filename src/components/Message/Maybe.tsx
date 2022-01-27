import Link from "next/link";
import { VFC } from "react";

type Props = {
  link: {
    href: string;
    text: string;
  };
  message: string;
};

export const Maybe: VFC<Props> = (props) => {
  return (
    <p className="mt-6 text-gray-500">
      {props.message}
      <Link href={props.link.href}>
        <a className="text-blue-600 hover:text-blue-400 no-underline border-b border-blue-400">
          {props.link.text}
        </a>
      </Link>
    </p>
  );
};
