import { HiSearch } from "react-icons/hi";
import { useState, useEffect, VFC, useCallback, FormEvent } from "react";
import { useRouter } from "next/router";

type Props = {
  setIsOpen: (isOpen: boolean) => void;
  handleClick: (text: string) => void;
};

export const SearchForm: VFC<Props> = (props) => {
  const [text, setText] = useState("");
  const router = useRouter();
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
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
    <form onSubmit={handleSubmit} className="flex w-full rounded border-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="授業名/教員名"
        className="py-2 px-4 w-full outline-blue-400 md:w-96"
      />
      <button
        type="submit"
        className="flex justify-center items-center px-2 border-l md:px-4"
      >
        <HiSearch className="w-5 h-5 text-gray-600 md:w-6 md:h-6" />
      </button>
    </form>
  );
};
