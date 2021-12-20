import Image from "next/image";
import Link from "next/link";
import { useState, VFC } from "react";

import { HiMenu, HiOutlineUserCircle } from "react-icons/hi";
import KcgLogo from "src/assets/images/kcg-logo.png";
import { Drawer } from "src/components/Drawer";

export const Header: VFC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header>
      <nav className="fixed z-10 flex w-full bg-white shadow h-14">
        <div className="z-20 p-2">
          <HiMenu
            title="ハンバーガーメニュー"
            size="40px"
            className="cursor-pointer"
            onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
          />
        </div>
        <div className="z-20 pt-2">
          <Link href="/">
            <a>
              <Image
                src={KcgLogo}
                alt="KCGのロゴ"
                width="48px"
                height="48px"
                className="cursor-pointer"
              />
            </a>
          </Link>
        </div>
        <div className="p-2 ml-auto">
          <HiOutlineUserCircle
            title="ユーザー"
            size="40px"
            className="text-gray-700 cursor-pointer"
          />
        </div>
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
      </nav>
    </header>
  );
};
