import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const GlobalAuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isLoggedIn = () => {
    const user = localStorage.getItem("userData");
    if (user) {
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, [isAuthenticated]);

  return (
    <GlobalAuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </GlobalAuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const authContext = useContext(GlobalAuthContext);
  if (authContext === null) {
    throw new Error("ThemeContext must be used within a theme provider.");
  }

  return authContext;
};
