import { VFC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Header: VFC<Props> = (props) => {
  return (
    <header>
      <nav className="fixed z-10 flex w-full bg-white shadow h-14">
        {props.children}
      </nav>
    </header>
  );
};
