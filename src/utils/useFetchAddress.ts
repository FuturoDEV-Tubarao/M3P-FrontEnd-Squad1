import { useEffect, useState } from "react";
import axios from "axios";

interface Address {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}

export function useFetchAddress(zipCode: string) {
  const [address, setAddress] = useState<Address>({
    street: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    const fetchAddress = async () => {
      if (zipCode.length === 8) {
        try {
          const response = await axios.get(
            `https://viacep.com.br/ws/${zipCode}/json/`
          );
          const data = response.data;
          if (!data.erro) {
            setAddress({
              street: data.logradouro,
              neighborhood: data.bairro,
              city: data.localidade,
              state: data.uf,
            });
          } else {
            alert("CEP não encontrado.");
          }
        } catch (error) {
          console.error("Falha ao buscar o CEP", error);
          alert("Erro ao buscar o CEP.");
        }
      }
    };
    fetchAddress();
  }, [zipCode]);

  return address;
}
