import { HiOutlineTrash } from "react-icons/hi";

export const DeleteButton = () => {
  return (
    <button className="px-3 py-2 font-bold text-white rounded bg-rose-500 hover:bg-rose-600 md:pr-3 md:pl-2">
      <HiOutlineTrash title="削除" size="24px" className="inline" />
      <span className="hidden md:align-bottom md:inline">削除</span>
    </button>
  );
};
