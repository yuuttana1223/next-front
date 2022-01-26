import { VFC, ReactNode, useContext, useEffect } from "react";
import { AuthContext } from "src/providers/AuthProvider";
import { useRouter } from "next/router";
import { PATH } from "src/urls/path";

export const ProtectUserRoute: VFC<{ children: ReactNode }> = (props) => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push(PATH.USERS.SIGN_IN);
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return <></>;
  }

  return <>{props.children}</>;
};
