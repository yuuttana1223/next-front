import { VFC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const AuthenticationLayout: VFC<Props> = (props) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="container flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
        <div className="w-full px-6 py-8 text-black bg-white rounded shadow-md">
          {props.children}
        </div>
      </div>
    </div>
  );
};
