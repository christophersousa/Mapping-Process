import { createContext, useState, useEffect, ReactNode } from "react";

import useAuth from "../hooks/useAuth";
import { Token } from "../interfaces/User";
import { PropsDataProcess } from "../interfaces/Process";
import useProcess from "../hooks/useProcess";
import { createSearchParams, useNavigate } from "react-router-dom";
import useSubprocess from "../hooks/useSubprocess";

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
  handleLogin: (data: PropsLoginUser) => Promise<void>;
  handleLogout: () => void;
  process: PropsDataProcess | undefined;
  getProcessId: (id: string, title: string) => void;
  getSubprocessId: (id: string, title: string) => void;
}

const Context = createContext({} as ProposContext);

function AuthProvider({ children }: IRouterContextProps) {
  const [process, setProcess] = useState<PropsDataProcess>()
  const { authenticated, loading, handleLogin, handleLogout, use } = useAuth();
  const {getProcessById} = useProcess()
  const {getSubprocessById} = useSubprocess()
  const navigate = useNavigate()

  async function getProcessId(id: string, title: string){
      try {
        const response = await getProcessById(id)
        setProcess(response)
        navigate({
          pathname: "/process",
          search: createSearchParams({
            id: response.id,
            title: title
          }).toString()
        })
      } catch (error) {
        console.log(error)
      }
  }

    async function getSubprocessId(id: string, title: string){
      try {
        const response = await getSubprocessById(id)
        setProcess(response)
        navigate({
          pathname: "/process",
          search: createSearchParams({
            id: response.id,
            title: title
          }).toString()
        })
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <Context.Provider
      value={{
        loading,
        authenticated,
        handleLogin,
        handleLogout,
        use,
        process,
        getProcessId,
        getSubprocessId
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };