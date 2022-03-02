import { HiOutlineTrash } from "react-icons/hi";
import { VFC } from "react";

type Props = {
  onClick: () => void;
};

export const DeleteButton: VFC<Props> = (props) => {
  return (
    <button
      onClick={props.onClick}
      className="py-2 px-3 font-bold text-white bg-rose-500 hover:bg-rose-600 rounded md:pr-3 md:pl-2"
    >
      <HiOutlineTrash title="削除" size="24px" className="inline" />
      <span className="hidden md:inline md:align-bottom">削除</span>
    </button>
  );
};
