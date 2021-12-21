import { VFC } from "react";

type Props = {
  link: {
    href: string;
    value: string;
  };
  message: string;
};

export const Maybe: VFC<Props> = (props) => {
  return (
    <div className="mt-6 text-gray-500">
      {props.message}
      <a
        className="text-blue-600 no-underline border-b border-blue-400 hover:text-blue-400"
        href={props.link.href}
      >
        {props.link.value}
      </a>
    </div>
  );
};
