import { ReactNode, VFC } from "react";
import { KcgLogoLink } from "src/components/shared/Link/KcgLogoLink";
import { Header } from "src/layouts/Header";

type Props = {
  children: ReactNode;
};

export const GuestLayout: VFC<Props> = (props) => {
  return (
    <>
      <Header>
        <h1 className="pt-2">
          <KcgLogoLink />
        </h1>
      </Header>
      <main>{props.children}</main>
    </>
  );
};
