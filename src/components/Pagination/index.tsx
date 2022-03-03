import { VFC, useCallback, useMemo } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import { useWindowDimensions } from "src/hooks/useWindowDimensions";

type Props = {
  pageCount: number;
  currentPage: number;
  queryParams: string;
  handleBackPage: () => void;
  handleNextPage: () => void;
};

export const Pagination: VFC<Props> = (props) => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isSmWidth = useMemo(() => width < 768, [width]);

  const handleClickPageNumber = useCallback(
    (num: number) => {
      router.push(`${props.queryParams}page=${num}`);
    },
    [props.queryParams, router]
  );

  if (props.pageCount === 0) {
    return <></>;
  }

  return (
    <ReactPaginate
      onPageChange={(e) => handleClickPageNumber(e.selected + 1)}
      forcePage={props.currentPage - 1}
      pageCount={props.pageCount}
      marginPagesDisplayed={isSmWidth ? 2 : 3}
      pageRangeDisplayed={isSmWidth ? 2 : 3}
      breakLabel={"..."}
      breakLinkClassName="block py-2 hover:bg-gray-100 rounded md:px-4"
      previousLabel={<HiOutlineChevronLeft size="24px" />}
      previousLinkClassName="block mr-1 hover:bg-gray-100 md:p-2 md:mr-4"
      nextLabel={<HiOutlineChevronRight size="24px" />}
      nextLinkClassName="block ml-1 hover:bg-gray-100 rounded md:p-2 md:ml-4"
      pageLinkClassName={`block py-1 px-2 hover:bg-gray-100 rounded md:px-4`}
      activeClassName="bg-gray-100"
      className="flex items-center text-gray-600"
    />
  );
};
