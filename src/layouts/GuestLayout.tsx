import { ReactNode, VFC } from "react";
import { KcgLogoLink } from "src/components/shared/Link/KcgLogoLink";
import { Header } from "src/layouts/Header";

export const GuestLayout: VFC<{ children: ReactNode }> = (props) => {
  return (
    <>
      <Header>
        <h1 className="pt-2">
          <KcgLogoLink />
        </h1>
      </Header>
      <main>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <div className="container flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto md:max-w-md">
            <div className="w-full px-6 py-4 mt-10 text-black bg-white rounded shadow-md md:py-6 md:mt-0">
              {props.children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
