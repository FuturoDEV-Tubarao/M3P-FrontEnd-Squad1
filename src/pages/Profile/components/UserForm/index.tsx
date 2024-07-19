import { useLocation } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { FormGroup, FormWrapper } from "./styles";
import { ButtonGroup } from "../../styles";
import { Header } from "../../../../components/Header";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import axios from "axios";
import { ErrorMessage, Row } from "../../../Register/styles";

enum GenderType {
  FEMALE = "FEMALE",
  MALE = "MALE",
}

const userProfileSchema = zod.object({
  name: zod.string().min(1, "Informe o nome"),
  gender: zod.nativeEnum(GenderType, {
    required_error: "Informe uma categoria",
  }),
  cpf: zod.string().length(11, "Informe um CPF válido"), // Corrigido para length(11)
  birthDate: zod.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Data inválida",
  }),
  email: zod.string().email("Informe um e-mail válido"), // Corrigido para email()
  password: zod.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  contactAddress: zod.object({
    zipCode: zod.string().length(8, "CEP é obrigatório"), // Corrigido para length(8)
    street: zod.string().min(1, "Rua é obrigatória"),
    number_address: zod.number().int().positive("Número deve ser positivo"),
    neighborhood: zod.string().min(1, "Bairro é obrigatório"),
    city: zod.string().min(1, "Cidade é obrigatória"),
    state: zod.string().min(1, "Estado é obrigatório"),
  }),
});


type UserProfileFormData = zod.infer<typeof userProfileSchema>;

export function UserForm() {
  const location = useLocation();
  const user = location.state?.user;
  const { update } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: user?.name || "",
      gender: user?.gender || "",
      birthDate: user?.birthDate || "",
      email: user?.email || "",
      cpf: user?.cpf || "",
      password: "",
      contactAddress: {
        zipCode: "",
        street: "",
        number_address: 0,
        neighborhood: "",
        city: "",
        state: "",
      },
    },
  });

  const zipCode = watch("contactAddress.zipCode");
  const [address, setAddress] = useState({
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

  useEffect(() => {
    setValue("contactAddress.street", address.street);
    setValue("contactAddress.neighborhood", address.neighborhood);
    setValue("contactAddress.city", address.city);
    setValue("contactAddress.state", address.state);
  }, [address, setValue]);


  const onSubmit: SubmitHandler<UserProfileFormData> = async (data) => {
    if (user?.id) {
      await update(user.id, data); 
    }
  };

  return (
    <>
      <Header currentPage={"dashboard"} />
      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <label htmlFor="name">Nome</label>
            <input id="name" {...register("name")} />
            {errors.name && <span>{errors.name.message}</span>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="gender">Sexo</label>
            <select id="gender" {...register("gender")}>
              <option value="MALE">Masculino</option>
              <option value="FEMALE">Feminino</option>
            </select>
            {errors.gender && <span>{errors.gender.message}</span>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="birthDate">Data de Nascimento</label>
            <input type="date" id="birthDate" {...register("birthDate")} />
            {errors.birthDate && <span>{errors.birthDate.message}</span>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" {...register("email")} />
            {errors.email && <span>{errors.email.message}</span>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="cpf">CPF</label>
            <input id="cpf" {...register("cpf")} />
            {errors.cpf && <span>{errors.cpf.message}</span>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" {...register("password")} />
            {errors.password && <span>{errors.password.message}</span>}
          </FormGroup>
          <FormGroup>
            <input
              type="text"
              {...register("contactAddress.zipCode")}
              placeholder="CEP"
            />
            {errors.contactAddress?.zipCode && (
              <ErrorMessage>
                {errors.contactAddress.zipCode.message}
              </ErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              {...register("contactAddress.number_address", {
                valueAsNumber: true,
              })}
              placeholder="Número"
            />
            {errors.contactAddress?.number_address && (
              <ErrorMessage>
                {errors.contactAddress.number_address.message}
              </ErrorMessage>
            )}
          </FormGroup>

          <Row>
            <FormGroup>
              <input
                {...register("contactAddress.street")}
                value={address.street}
                placeholder="Logradouro"
              />
              {errors.contactAddress?.street && (
                <ErrorMessage>
                  {errors.contactAddress.street.message}
                </ErrorMessage>
              )}
            </FormGroup>
          </Row>
          <Row>
            <FormGroup>
              <input
                {...register("contactAddress.neighborhood")}
                value={address.neighborhood}
                placeholder="Bairro"
              />
              {errors.contactAddress?.neighborhood && (
                <ErrorMessage>
                  {errors.contactAddress.neighborhood.message}
                </ErrorMessage>
              )}
            </FormGroup>
            <FormGroup>
              <input
                {...register("contactAddress.city")}
                value={address.city}
                placeholder="Cidade"
              />
              {errors.contactAddress?.city && (
                <ErrorMessage>
                  {errors.contactAddress.city.message}
                </ErrorMessage>
              )}
            </FormGroup>
            <FormGroup>
              <input
                {...register("contactAddress.state")}
                value={address.state}
                placeholder="Estado"
              />
              {errors.contactAddress?.state && (
                <ErrorMessage>
                  {errors.contactAddress.state.message}
                </ErrorMessage>
              )}
            </FormGroup>
          </Row>
          <ButtonGroup>
            <button type="submit">Salvar</button>
          </ButtonGroup>
        </form>
      </FormWrapper>
    </>
  );
}
