import Link from "next/link";
import { Dispatch, SetStateAction, VFC } from "react";
import { PATH } from "src/urls/path";
import { HiHome } from "react-icons/hi";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const Drawer: VFC<Props> = (props) => {
  return (
    <>
      <section
        className={`fixed inset-0 z-10 w-64 md:w-72 h-full transition-all overflow-y-scroll duration-500 ease-in-out transform bg-white ${
          props.isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col sm:flex-row sm:justify-around">
          <ul className="w-full h-screen">
            <li className="mt-16">
              <Link href={PATH.ROOT}>
                <a className="flex items-center p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex ml-3">
                    <HiHome title="ホーム" size="28px" />
                    <p className="ml-3 text-lg">ホーム</p>
                  </div>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </section>
      {props.isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 opacity-40"
          onClick={() => props.setIsOpen(false)}
        ></div>
      )}
    </>
  );
};
