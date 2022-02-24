import { ReactNode, VFC, useState, useCallback, useContext } from "react";
import { Header } from "src/layouts/Header";
import { HiMenu } from "react-icons/hi";
import { Drawer } from "src/components/Drawer";
import { KcgLogoLink } from "src/components/shared/Link/KcgLogoLink";
import { SearchInput } from "src/components/shared/Input/SearchInput";
import { useRouter } from "next/router";
import { PATH } from "src/urls/path";
import { SettingDropDown } from "src/components/Dropdown/SettingDropDown";
import { SearchModal } from "src/components/Modal/SearchModal";
import { AuthContext } from "src/providers/AuthProvider";
import { LoginLink } from "src/components/shared/Link/LoginLink";

type Props = {
  children: ReactNode;
  isSearchInput?: boolean;
  className?: string;
};

export const AppLayout: VFC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchModal, setIsSearchModal] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  const handleClick = useCallback(
    (text: string) => {
      router.push(
        `${
          Object.keys(router.query)[0] === "sort_by"
            ? `${router.asPath.split("&page=")[0].split("&search_query")[0]}&`
            : `${PATH.ROOT}?`
        }search_query=${text}`
      );
    },
    [router]
  );
  return (
    <>
      <Header>
        <div
          className={`fixed inset-0 z-20 w-64 h-14 md:w-72 transition-all duration-500 ease-in-out transform bg-white ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        ></div>
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
        {props.isSearchInput && (
          <div className="ml-auto md:mx-auto">
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

        {currentUser ? (
          <div className={`${props.isSearchInput ? "md:ml-0" : "ml-auto"}`}>
            <SettingDropDown />
          </div>
        ) : (
          <div
            className={`flex mx-2 ${
              props.isSearchInput ? "md:ml-0" : "ml-auto"
            }`}
          >
            <LoginLink href={PATH.USERS.SIGN_IN}>ログイン</LoginLink>
          </div>
        )}

        <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
      </Header>
      <main className={props.className}>
        <div className="container py-24 px-5 mx-auto">{props.children}</div>
      </main>
    </>
  );
};
