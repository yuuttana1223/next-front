import { VFC } from "react";
type Props = {
  message: string;
};

export const ErrorMessage: VFC<Props> = (props) => {
  return (
    <p className="mt-1 text-xs text-red-400 break-words ">{props.message}</p>
  );
};
