import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { User } from "src/types/user";
import { VFC } from "react";

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
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {props.children}
    </AuthContext.Provider>
  );
};
