import { VFC, ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
};

export const ExternalLink: VFC<Props> = (props) => {
  return (
    <a
      href={props.href}
      target="_blank"
      className="block py-2 hover:bg-gray-100"
      rel="noreferrer"
    >
      {props.children}
    </a>
  );
};
