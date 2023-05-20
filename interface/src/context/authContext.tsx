import { createContext, useState, useEffect, ReactNode } from "react";

import useAuth from "../hooks/useAuth";
import { Token } from "../interfaces/User";
interface IRouterContextProps {
  children: ReactNode;
}


interface PropsLoginUser {
  email: string;
  password: string;
}



interface ProposContext {
  use: Token | null | undefined;
  loading: boolean;
  authenticated: boolean;
  handleLogin: (data: PropsLoginUser) => Promise<string>;
  handleLogout: () => void;
}

const Context = createContext({} as ProposContext);

function AuthProvider({ children }: IRouterContextProps) {
  const { authenticated, loading, handleLogin, handleLogout, use } = useAuth();

  return (
    <Context.Provider
      value={{
        loading,
        authenticated,
        handleLogin,
        handleLogout,
        use,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };