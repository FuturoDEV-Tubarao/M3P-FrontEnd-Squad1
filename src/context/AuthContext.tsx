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
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const isLogado = localStorage.getItem("isLogado");
    const lastLoginTime = localStorage.getItem("lastLoginTime");

    //Cálculo do tempo decorrido desde o login
    //Caso a pessoa atualize a página o tempo não será zerado, continuará de onde estava
    if (storedUser && token && isLogado === "true" && lastLoginTime) {
      const loginTime = parseInt(lastLoginTime, 10);
      const currentTime = Date.now();
      const elapsed = currentTime - loginTime;
      const remainingTime = 15 * 60 * 1000 - elapsed;

      //Se o tempo restante for positivo (remainingTime > 0), o usuário ainda tem tempo restante na sessão:
      //Se o remainingTime for zero ou negativo, a sessão já expirou e o usuário é deslogado (logout()).
      if (remainingTime > 0) {
        setUser(JSON.parse(storedUser));
        startLogoutTimer(remainingTime);
      } else {
        logout(); // Se o tempo já tiver expirado
      }
    }
  }, []);

  const startLogoutTimer = (delay: number) => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      navigate('/session-expired');
      logout();
    }, delay);
    setTimer(newTimer);
  };

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
        localStorage.setItem("lastLoginTime", Date.now().toString());

        const userData: User = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        startLogoutTimer(15 * 60 * 1000); // Inicia o temporizador ao fazer login
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
    localStorage.removeItem("lastLoginTime");
    setUser(null);
    if (timer) {
      clearTimeout(timer); // Limpa o timer ao deslogar
    }
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
