import { Dialog, Transition } from "@headlessui/react";
import { Fragment, VFC } from "react";
import { HiOutlineX, HiOutlineExclamationCircle } from "react-icons/hi";

type Props = {
  isOpen?: boolean;
  closeModal: () => void;
  handleDelete: () => void;
};

export const DeleteModal: VFC<Props> = (props) => {
  return (
    <>
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="overflow-y-auto fixed inset-0 z-10 bg-gray-600/60"
          onClose={props.closeModal}
        >
          <div className="px-4 min-h-screen text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block overflow-hidden relative z-20 p-6 my-8 w-full max-w-md text-left align-middle bg-white rounded-2xl shadow-xl transition-all">
                <div className="flex justify-end">
                  <button onClick={props.closeModal}>
                    <HiOutlineX title="閉じる" size="20" />
                  </button>
                </div>
                <div className="flex justify-center">
                  <HiOutlineExclamationCircle title="注意" size="52" />
                </div>
                <div className="mt-2">
                  <p className="text-sm text-center text-gray-500">
                    本当にレビューを削除してもよろしいですか？
                    付随するコメントも一緒に削除されます。
                  </p>
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    onClick={props.handleDelete}
                    type="button"
                    className="inline-flex items-center py-2.5 px-5 mr-2 text-sm font-medium text-center text-white bg-red-600 hover:bg-red-800 rounded-lg focus:ring-4 focus:ring-red-300"
                  >
                    削除します
                  </button>
                  <button
                    onClick={props.closeModal}
                    type="button"
                    className="focus:z-10 py-2 px-5 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500 focus:ring-4 focus:ring-gray-300"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
