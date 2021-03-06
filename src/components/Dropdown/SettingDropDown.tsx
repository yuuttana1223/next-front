import { Menu, Transition } from "@headlessui/react";
import {
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineUserCircle,
  HiOutlineUser,
} from "react-icons/hi";
import { Fragment, useCallback, useContext } from "react";
import { signOut } from "src/apis/auth";
import toast from "react-hot-toast";
import { AuthContext } from "src/providers/AuthProvider";
import Link from "next/link";
import { PATH } from "src/urls/path";
export const SettingDropDown = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const handleClick = useCallback(() => {
    signOut()
      .then((res) => {
        if (res.status === 200) {
          setCurrentUser(undefined);
          toast.success("ログアウトしました");
        } else {
          toast.error("ログアウトに失敗しました");
        }
      })
      .catch(() => {
        toast.error("ログアウトに失敗しました");
      });
  }, [setCurrentUser]);
  return (
    <Menu as={Fragment}>
      <Menu.Button className="block p-1 active:bg-gray-200 rounded-full outline-none">
        <HiOutlineUserCircle
          title="ユーザー"
          size="40px"
          className="text-gray-700 cursor-pointer"
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
          <p className="pb-1 pl-2 font-semibold break-all border-b-1">
            <HiOutlineUser title="ユーザー" size="20px" className="inline" />
            <span className="ml-2">{currentUser?.name}</span>
          </p>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? "bg-gray-200" : ""
                }  flex w-full py-2 pl-2 text-sm text-gray-900`}
              >
                <Link href={PATH.USERS.EDIT(currentUser?.id)}>
                  <a>
                    <HiOutlineCog title="設定" size="20px" className="inline" />
                    <span className="ml-2">ユーザー編集</span>
                  </a>
                </Link>
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleClick}
                className={`${
                  active ? "bg-gray-200" : ""
                } flex items-center w-full py-2 pl-2 text-sm text-gray-900`}
              >
                <HiOutlineLogout
                  title="ログアウト"
                  size="20px"
                  className="inline"
                />
                <span className="ml-2">ログアウト</span>
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
