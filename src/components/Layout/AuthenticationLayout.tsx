import { VFC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const AuthenticationLayout: VFC<Props> = (props) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="container flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto md:max-w-md">
        <div className="w-full px-6 py-4 mt-10 text-black bg-white rounded shadow-md md:py-6 md:mt-0">
          {props.children}
        </div>
      </div>
    </div>
  );
};
