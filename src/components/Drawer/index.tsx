import { Dispatch, SetStateAction, VFC } from "react";
type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const Drawer: VFC<Props> = (props) => {
  return (
    <>
      <section
        className={`fixed inset-0 z-10 w-64 h-full transition-all overflow-y-scroll duration-300 ease-in-out transform bg-white ${
          props.isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      ></section>
      {props.isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 opacity-40"
          onClick={() => props.setIsOpen(false)}
        ></div>
      )}
    </>
  );
};
