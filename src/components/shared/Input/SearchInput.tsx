import { HiSearch } from "react-icons/hi";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { PATH } from "src/urls/path";

export const SearchInput = () => {
  const [text, setText] = useState("");
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(
      `${
        Object.keys(router.query)[0] === "sort_by"
          ? `${router.asPath.split("&search_query")[0]}&`
          : `${PATH.ROOT}?`
      }search_query=${text}`
    );
  }, [text, router]);

  useEffect(() => {
    if (!router.query.search_query) {
      setText("");
    }
  }, [router.query.search_query]);

  return (
    <div className="flex w-full rounded border-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="授業名/教員名"
        className="py-2 px-4 w-full outline-blue-400 md:w-96"
      />
      <button
        onClick={handleClick}
        className="flex justify-center items-center px-2 border-l md:px-4"
      >
        <HiSearch className="w-5 h-5 text-gray-600 md:w-6 md:h-6" />
      </button>
    </div>
  );
};
