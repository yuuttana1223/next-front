import { VFC } from "react";
import { HiOutlineThumbUp, HiThumbUp } from "react-icons/hi";

type Props = {
  onClick: () => void;
  isLiked?: boolean;
  count?: number;
};

export const GoodButton: VFC<Props> = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`cursor-pointer ${
        props.isLiked ? "hover:text-gray-600" : "hover:text-gray-500"
      }`}
    >
      {props.isLiked ? (
        <HiThumbUp title="いいね済み" size="24px" className="inline" />
      ) : (
        <HiOutlineThumbUp title="いいねボタン" size="24px" className="inline" />
      )}
      <span className="ml-1 align-bottom">{props.count}</span>
    </button>
  );
};
