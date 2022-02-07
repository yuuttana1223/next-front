import { VFC } from "react";
type Props = {
  message?: string;
  className?: string;
};

export const ErrorMessage: VFC<Props> = (props) => {
  return (
    <p className={`mt-1 text-xs text-red-400 break-words ${props.className}`}>
      {props.message}
    </p>
  );
};
