import { createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/axiosConfig";

interface RegisterContextType {
  signup: (data: RegisterData) => Promise<void>;
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
  zipCode: string;
  street: string;
  number_adddress: number;
  neighborhood: string;
  city: string;
  state: string;
};

interface RegisterContextProviderProps {
  children: ReactNode;
}

export const RegisterContext = createContext({} as RegisterContextType);

export function RegisterContextProvider({
  children,
}: RegisterContextProviderProps) {
  const navigate = useNavigate();

  const signup = async (data: RegisterData) => {
    try {
      console.log(data);
      const response = await api.post("/api/labfoods/v1/user", data,{
        headers: {
          'Content-Type': 'application/json',
        },
    });

      if (response.data && response.status === 200) {
        alert("Cadastro realizado com sucesso!");
        navigate("/");
      } else {
        alert("Não foi possível realizar o cadastro");
      }
    } catch (error) {
      alert("Erro ao tentar cadastrar usuário");
    }
  };

  return (
    <RegisterContext.Provider value={{ signup }}>
      {children}
    </RegisterContext.Provider>
  );
}
