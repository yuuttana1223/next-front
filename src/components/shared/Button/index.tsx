import { VFC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Button: VFC<Props> = (props) => {
  return (
    <button
      type="submit"
      className="w-full py-3 text-center text-white rounded bg-emerald-400 hover:bg-emerald-500 focus:outline-none"
    >
      {props.children}
    </button>
  );
};
