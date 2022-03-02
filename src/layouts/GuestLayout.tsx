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
          <div className="container flex flex-col flex-1 justify-center items-center px-2 mx-auto max-w-sm md:max-w-md">
            <div className="py-4 px-6 mt-10 w-full text-black bg-white rounded shadow-md md:py-6 md:mt-0">
              {props.children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
