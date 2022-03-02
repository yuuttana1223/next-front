import Link from "next/link";
import { VFC } from "react";
import Image from "next/image";
import KcgLogo from "src/assets/images/kcg-logo.png";
import { PATH } from "src/urls/path";

export const KcgLogoLink: VFC = () => {
  return (
    <Link href={PATH.ROOT}>
      <a>
        <Image src={KcgLogo} alt="KCGのロゴ" width="48px" height="48px" />
      </a>
    </Link>
  );
};
