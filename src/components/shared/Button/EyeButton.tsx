import { VFC, ReactNode } from "react";

type Props = {
  onClick: () => void;
  children: ReactNode;
};

export const EyeButton: VFC<Props> = (props) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className="absolute top-2 right-2 bg-white cursor-pointer"
    >
      {props.children}
    </button>
  );
};
