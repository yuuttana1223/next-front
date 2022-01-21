import { Dialog, Transition } from "@headlessui/react";
import { Fragment, VFC } from "react";
import { HiOutlineX, HiOutlineExclamationCircle } from "react-icons/hi";

type Props = {
  isOpen?: boolean;
  closeModal: () => void;
  handleDelete: () => Promise<void>;
};

export const DeleteModal: VFC<Props> = (props) => {
  return (
    <>
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-gray-600 bg-opacity-60"
          onClose={props.closeModal}
        >
          <div className="min-h-screen px-4 text-center">
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
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
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    削除します
                  </button>
                  <button
                    onClick={props.closeModal}
                    type="button"
                    className="px-5 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
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
