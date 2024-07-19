import { createContext, ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/axiosConfig";

interface AuthContextType {
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  logado: () => boolean;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const navigate = useNavigate();

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
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("isLogado", "true");
  
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
    localStorage.removeItem("user");
    localStorage.removeItem("isLogado");
    
  };

  function logado () {
    const isLogado = localStorage.getItem("isLogado")

    if(isLogado){
      return true
    } else {
      return false
    }
  }

  return (
    <AuthContext.Provider value={{ login, logout, logado }}>
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
