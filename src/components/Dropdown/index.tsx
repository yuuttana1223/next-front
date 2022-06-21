import { Menu, Transition } from "@headlessui/react";
import { Fragment, VFC } from "react";
import {
  HiOutlineDotsVertical,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from "react-icons/hi";
import { Comment } from "src/apis/reviewComment";

type Props = {
  // eslint-disable-next-line no-unused-vars
  openModal: (commentId: number) => void;
  // eslint-disable-next-line no-unused-vars
  handleEdit: (commentId?: number, body?: string) => void;
  comment: Comment;
};

export const DropDown: VFC<Props> = (props) => {
  return (
    <Menu as="div" className="absolute top-2 right-0">
      <Menu.Button className="block p-1 active:bg-gray-200 rounded-full border-2 border-white">
        <HiOutlineDotsVertical
          title="操作ボタン"
          size={20}
          className="inline w-6"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 py-2 w-40 bg-white rounded-md divide-y divide-gray-100 focus:outline-none ring-black/5 shadow-lg origin-top-right">
          <Menu.Item>
            {({ active }: { active: boolean }) => (
              <button
                onClick={() =>
                  props.handleEdit(props.comment.id, props.comment.body)
                }
                className={`${
                  active ? "bg-gray-200" : ""
                }  flex w-full py-2 pl-2 text-sm text-gray-900`}
              >
                <HiOutlinePencilAlt
                  title="編集"
                  size="20px"
                  className="inline"
                />
                <span className="ml-2">編集</span>
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }: { active: boolean }) => (
              <button
                onClick={() => props.openModal(props.comment.id)}
                className={`${
                  active ? "bg-gray-200" : ""
                }  flex items-center w-full py-2 pl-2 text-sm text-gray-900`}
              >
                <HiOutlineTrash title="削除" size="20px" className="inline" />
                <span className="ml-2">削除</span>
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
