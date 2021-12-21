import Link from "next/link";
import { VFC } from "react";
import Image from "next/image";
import KcgLogo from "src/assets/images/kcg-logo.png";

export const KcgLogoLink: VFC = () => {
  return (
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
  );
};
