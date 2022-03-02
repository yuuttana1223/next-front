import { VFC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  type: "submit" | "reset" | "button";
  disabled?: boolean;
  className?: string;
};

export const Button: VFC<Props> = (props) => {
  return (
    <button
      type={props.type}
      disabled={props.disabled}
      className={`py-3 text-center text-white rounded bg-emerald-400 hover:bg-emerald-500 focus:outline-none ${props.className}`}
    >
      {props.children}
    </button>
  );
};
