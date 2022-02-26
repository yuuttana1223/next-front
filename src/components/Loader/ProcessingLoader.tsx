import { ImSpinner2 } from "react-icons/im";
import { VFC } from "react";

type Props = {
  className?: string;
};

export const ProcessingLoader: VFC<Props> = (props) => {
  return (
    <ImSpinner2
      className={`inline w-4 h-4 text-white animate-spin ${props.className}`}
    />
  );
};
