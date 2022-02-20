import { VFC, ReactNode, useContext, useEffect } from "react";
import { AuthContext } from "src/providers/AuthProvider";
import { useRouter } from "next/router";
import { PATH } from "src/urls/path";

export const CorrectUserRoute: VFC<{ children: ReactNode }> = (props) => {
  const router = useRouter();
  const userId = Number(router.query.id);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser?.id !== userId) {
      router.push(`${PATH.USERS.EDIT(currentUser?.id)}`);
    }
  }, [currentUser, router, userId]);

  if (currentUser?.id === userId) {
    return <>{props.children}</>;
  }

  return <></>;
};
