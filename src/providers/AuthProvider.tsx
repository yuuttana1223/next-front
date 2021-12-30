import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { User } from "src/types/user";
import { VFC } from "react";
import { fetchCurrentUser } from "src/apis/auth";

export const AuthContext = createContext(
  {} as {
    authState: Auth;
    setAuthState: Dispatch<SetStateAction<Auth>>;
  }
);

type Auth = {
  loading: boolean;
  isSignedIn: boolean;
  currentUser?: User;
};

export const AuthProvider: VFC<{ children: ReactNode }> = (props) => {
  const [authState, setAuthState] = useState<Auth>({
    loading: false,
    isSignedIn: false,
    currentUser: undefined,
  });

  useEffect(() => {
    fetchCurrentUser()?.then((res) => {
      setAuthState((prevAuthState) => {
        return {
          ...prevAuthState,
          isSignedIn: res.data.is_login,
          currentUser: res.data.user,
        };
      });
    });
  }, []);
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {props.children}
    </AuthContext.Provider>
  );
};
