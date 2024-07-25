// UserContext.tsx
import { createContext, ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/axiosConfig";
import { AuthContext } from "./AuthContext";

enum GenderType {
  FEMALE = "FEMALE",
  MALE = "MALE",
}

type RegisterData = {
  name: string;
  gender: GenderType;
  cpf: string;
  birthDate: string;
  active: boolean;
  email: string;
  password?: string;
  userAddress: {
    zipCode: string;
    street: string;
    numberAddress: number;
    neighborhood: string;
    city: string;
    state: string;
  };
};

interface User {
  id: string;
  name: string;
  email: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface UserContextType {
  signup: (data: RegisterData) => Promise<void>;
  update: (id: string, data: RegisterData) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  getUserById: (id: string) => Promise<User | null>;
}

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextType);

export function UserContextProvider({ children }: UserContextProviderProps) {
  const navigate = useNavigate();
  const { setUser, login } = useContext(AuthContext);

  const signup = async (data: RegisterData) => {
    try {
      const response = await api.post("/api/labfoods/v1/user", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data && response.status === 200) {
        alert("Cadastro realizado com sucesso!");
        navigate("/login");
      } else {
        alert("Não foi possível realizar o cadastro");
      }
    } catch (error) {
      alert("Erro ao tentar cadastrar usuário");
    }
  };

  const update = async (id: string, data: RegisterData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token não encontrado");
      }

      const response = await api.put(`/api/labfoods/v1/user/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data && response.status === 200) {
        localStorage.setItem("token", token);
        localStorage.setItem("isLogado", "true");

        const loginData: LoginData = {
          email: data.email,
          password: data.password || "",
        };

        const userData: User = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

        alert("Usuário atualizado com sucesso!");
        login(loginData);
        navigate("/");
      } else {
        alert("Não foi possível atualizar o usuário");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao tentar atualizar usuário");
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.delete(`/api/labfoods/v1/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isLogado");
        setUser(null);
        alert("Usuário excluído com sucesso!");
        navigate("/");
      } else {
        alert("Não foi possível excluir o usuário");
      }
    } catch (error) {
      alert("Erro ao tentar excluir usuário");
    }
  };

  const getUserById = async (id: string): Promise<User | null> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token não encontrado");
      }

      const response = await api.get(`/api/labfoods/v1/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      alert("Erro ao tentar buscar usuário");
      return null;
    }
  };
  return (
    <UserContext.Provider value={{ signup, update, getUserById, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
}
