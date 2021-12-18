import { ReactNode, VFC } from "react";
import { Header } from "src/layouts/Header";

type Props = {
  children: ReactNode;
};

export const AppLayout: VFC<Props> = (props) => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
    </>
  );
};
