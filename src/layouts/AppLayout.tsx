import { ReactNode, VFC, useState } from "react";
import { Header } from "src/layouts/Header";
import { HiMenu, HiOutlineUserCircle } from "react-icons/hi";
import { Drawer } from "src/components/Drawer";
import { KcgLogoLink } from "src/components/shared/Link/KcgLogoLink";
import { SearchInput } from "src/components/shared/Input/SearchInput";
import { useRouter } from "next/router";
import { PATH } from "src/urls/path";
import { SearchModal } from "src/components/Modal/SearchModal";

export const AppLayout: VFC<{ children: ReactNode }> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchModal, setIsSearchModal] = useState(false);
  const router = useRouter();
  const handleClick = useCallback(
    (text: string) => {
      router.push(
        `${
          Object.keys(router.query)[0] === "sort_by"
            ? `${router.asPath.split("&search_query")[0]}&`
            : `${PATH.ROOT}?`
        }search_query=${text}`
      );
    },
    [router]
  );
  return (
    <>
      <Header>
        <div className="z-20 p-2">
          <HiMenu
            title="ハンバーガーメニュー"
            size="40px"
            className="cursor-pointer"
            onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
          />
        </div>
        <h1 className="flex z-20 mt-2 w-12 h-12 md:mr-2">
          <KcgLogoLink />
        </h1>
        {router.pathname === PATH.ROOT && (
          <div className="flex items-center ml-auto md:justify-center">
            <SearchInput
              setIsOpen={setIsSearchModal}
              handleClick={handleClick}
            />
            <SearchModal
              isOpen={isSearchModal}
              setIsOpen={setIsSearchModal}
              handleClick={handleClick}
            />
          </div>
        )}
        <div className="p-2 ml-auto">
          <HiOutlineUserCircle
            title="ユーザー"
            size="40px"
            className="text-gray-700 cursor-pointer"
          />
        </div>
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
      </Header>
      <main>
        <div className="container py-24 px-5 mx-auto">{props.children}</div>
      </main>
    </>
  );
};
