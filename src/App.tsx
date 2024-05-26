import { createContext, useCallback, useMemo, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Layout from "./components/Layout";

export const BASE = "https://kanban-tsx.netlify.app";

type TUserContext = {
  user?: string;
  setUser: (id: any) => void;
};

export const UserContext = createContext<TUserContext | null>(null);

function App() {
  const [user, setUser] = useState(undefined);

  const setUserCallback = useCallback(
    (id: any) => {
      setUser(id);
    },
    [setUser]
  );

  const contextValue = useMemo(
    () => ({
      user,
      setUser: setUserCallback,
    }),
    [user, setUserCallback]
  );

  return (
    <UserContext.Provider value={contextValue}>
      {!user ? <Login /> : <Layout />}
      {/* <Layout /> */}
    </UserContext.Provider>
  );
}

export default App;
