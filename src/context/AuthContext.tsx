import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/axiosConfig";

interface AuthContextType {
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  logado: () => boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface LoginData {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const isLogado = localStorage.getItem("isLogado");

    if (storedUser && token && isLogado === "true") {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (data: LoginData) => {
    try {
      const credentials = btoa(`${data.email}:${data.password}`);

      const response = await api.post("/api/labfoods/v1/auth", data, {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      if (response.data && response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLogado", "true");
        const userData: User = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

        navigate("/");
      } else {
        alert("Não foi possível realizar o login");
      }
    } catch (error) {
      alert("Erro ao tentar fazer login");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLogado");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  function logado() {
    return localStorage.getItem("isLogado") === "true";
  }

  return (
    <AuthContext.Provider value={{ login, logout, logado, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
}
