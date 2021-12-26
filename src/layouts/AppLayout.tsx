import { ReactNode, VFC, useState } from "react";
import { Header } from "src/layouts/Header";
import { HiMenu, HiOutlineUserCircle } from "react-icons/hi";
import { Drawer } from "src/components/Drawer";
import { KcgLogoLink } from "src/components/shared/Link/KcgLogoLink";

export const AppLayout: VFC<{ children: ReactNode }> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

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
        <h1 className="z-20 pt-2">
          <KcgLogoLink />
        </h1>
        <div className="p-2 ml-auto">
          <HiOutlineUserCircle
            title="ユーザー"
            size="40px"
            className="text-gray-700 cursor-pointer"
          />
        </div>
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
      </Header>
      <main>{props.children}</main>
    </>
  );
};
