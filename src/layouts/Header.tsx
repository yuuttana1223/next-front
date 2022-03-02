import { VFC, ReactNode } from "react";

export const Header: VFC<{ children: ReactNode }> = (props) => {
  return (
    <header>
      <nav className="flex fixed z-10 items-center w-full h-14 bg-gray-50 shadow-md">
        {props.children}
      </nav>
    </header>
  );
};
