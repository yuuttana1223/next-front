import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
  VFC,
} from "react";
import { User } from "src/types/user";
import { fetchCurrentUser } from "src/apis/auth";
import { AxiosError } from "axios";

export const AuthContext = createContext(
  {} as {
    currentUser?: User;
    setCurrentUser: Dispatch<SetStateAction<User | undefined>>;
  }
);

export const AuthProvider: VFC<{ children: ReactNode }> = (props) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (fetchCurrentUser() === undefined) {
      setLoading(false);
    } else {
      fetchCurrentUser()
        ?.then((res) => {
          setCurrentUser(res.data.user);
        })
        .catch((e: AxiosError) => {
          console.error(e.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
