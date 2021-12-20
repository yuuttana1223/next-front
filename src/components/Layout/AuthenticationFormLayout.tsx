import { VFC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const AuthenticationFormLayout: VFC<Props> = (props) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="container flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
        {props.children}
      </div>
    </div>
  );
};
