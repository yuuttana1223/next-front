import { VFC, useState, useCallback, useEffect, FormEvent } from "react";
import { Dialog } from "@headlessui/react";
import { HiSearch, HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useRouter } from "next/router";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleClick: (text: string) => void;
};

export const SearchModal: VFC<Props> = (props) => {
  const [text, setText] = useState("");
  const router = useRouter();
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      props.setIsOpen(false);
      props.handleClick(text);
    },
    [props, text]
  );

  useEffect(() => {
    if (!router.query.search_query) {
      setText("");
    }
  }, [router.query.search_query]);

  return (
    <Dialog
      open={props.isOpen}
      onClose={() => props.setIsOpen(false)}
      className="absolute top-0 z-30 w-full h-14 bg-white"
    >
      <Dialog.Overlay />
      <form onSubmit={handleSubmit} className="flex mx-auto w-11/12">
        <button
          type="button"
          onClick={() => props.setIsOpen(false)}
          className="outline-none"
        >
          <HiOutlineArrowNarrowLeft className="mt-3 w-7 h-7 text-gray-600 outline-none md:w-6 md:h-6" />
        </button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          autoFocus
          placeholder="授業名/教員名"
          className="peer block px-0 pt-3 mx-3 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-0 appearance-none"
        />
        <button type="submit" className="outline-none">
          <HiSearch className="mt-3 w-7 h-7 text-gray-600 md:w-6 md:h-6" />
        </button>
      </form>
    </Dialog>
  );
};
