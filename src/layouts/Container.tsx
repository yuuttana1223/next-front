import { VFC, ReactNode } from "react";
export const Container: VFC<{ children: ReactNode }> = (props) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="container flex flex-col flex-1 px-2 mx-auto max-w-sm md:justify-center md:max-w-md">
        <div className="py-4 px-6 mt-10 w-full text-black bg-white rounded shadow-md md:py-6 md:mt-0">
          {props.children}
        </div>
      </div>
    </div>
  );
};
