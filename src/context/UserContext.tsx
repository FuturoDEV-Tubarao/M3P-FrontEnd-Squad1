import { createContext, ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/axiosConfig";
import { AuthContext } from "./AuthContext";

interface UserContextType {
  signup: (data: RegisterData) => Promise<void>;
  update: (id: string, data: RegisterData) => Promise<void>;
  deleteUser: (id: string) => Promise<void>; // Novo método
}

enum GenderType {
  FEMALE = "FEMALE",
  MALE = "MALE",
}

type RegisterData = {
  name: string;
  gender: GenderType;
  cpf: string;
  birthDate: string;
  email: string;
  password: string;
  contactAddress: {
    zipCode: string;
    street: string;
    number_address: number;
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

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextType);

export function UserContextProvider({ children }: UserContextProviderProps) {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const signup = async (data: RegisterData) => {
    try {
      console.log(data);
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
  
      console.log("Token:", token);
      console.log(data);
  
      const response = await api.put(`/api/labfoods/v1/user/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.data && response.status === 200) {
        localStorage.setItem("token", token);
        localStorage.setItem("isLogado", "true");
  
        const userData: User = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
        };
  
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
  
        alert("Usuário atualizado com sucesso!");
        navigate("/profile");
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
      console.log(id);
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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ signup, update, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
}
