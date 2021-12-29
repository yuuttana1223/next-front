import { VFC, ReactNode } from "react";

export const Header: VFC<{ children: ReactNode }> = (props) => {
  return (
    <header>
      <nav className="fixed z-10 flex w-full bg-white shadow h-14">
        {props.children}
      </nav>
    </header>
  );
};
