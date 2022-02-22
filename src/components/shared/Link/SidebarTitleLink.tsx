import { VFC, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
type Props = {
  href: string;
  children: ReactNode;
};

export const SidebarTitleLink: VFC<Props> = (props) => {
  const router = useRouter();
  return (
    <Link href={props.href}>
      <a
        className={`flex items-center p-2 text-gray-600 rounded hover:text-gray-800 hover:bg-gray-100 transition-colors duration-200 ${
          router.asPath.split("?")[0] === props.href && "bg-gray-100"
        }`}
      >
        {props.children}
      </a>
    </Link>
  );
};
