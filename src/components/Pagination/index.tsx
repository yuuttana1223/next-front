import { VFC, useCallback } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";

type Props = {
  pageCount: number;
  currentPage: number;
  queryParams: string;
  handleBackPage: () => void;
  handleNextPage: () => void;
};

export const Pagination: VFC<Props> = (props) => {
  const router = useRouter();

  const handleClickPageNumber = useCallback(
    (num: number) => {
      router.push(`${props.queryParams}page=${num}`);
    },
    [props.queryParams, router]
  );

  return (
    <ReactPaginate
      onPageChange={(e) => handleClickPageNumber(e.selected + 1)}
      forcePage={props.currentPage - 1}
      pageCount={props.pageCount}
      breakLabel="..."
      previousLabel={<HiOutlineChevronLeft size="24px" />}
      previousLinkClassName="block  hover:bg-gray-100 p-2 mr-4"
      nextLabel={<HiOutlineChevronRight size="24px" />}
      nextLinkClassName="block p-2 ml-4 rounded hover:bg-gray-100"
      pageLinkClassName={`block py-2 px-4 hover:bg-gray-100 rounded`}
      activeClassName="bg-gray-100"
      className="flex items-center text-gray-600"
    />
  );
};
