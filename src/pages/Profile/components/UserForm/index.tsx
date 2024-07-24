import { useLocation } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Header } from "../../../../components/Header";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { ErrorMessage, FieldWrapper, Row } from "../../../Register/styles";
import {
  Buttons,
  Input,
  LinkProfile,
  StyledSelect,
  UpdateContainer,
  UpdateContent,
} from "./styles";
import { useFetchAddress } from "../../../../utils/useFetchAddress";

enum GenderType {
  FEMALE = "FEMALE",
  MALE = "MALE",
}

interface User {
  id?: string;
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
}

const userProfileSchema = zod.object({
  name: zod.string().min(1, "Nome deve ser maior que 1 caractere"),
  gender: zod.nativeEnum(GenderType, {
    required_error: "Informe uma categoria",
  }),
  cpf: zod.string().length(11, "Informe um CPF válido"),
  birthDate: zod.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Data inválida",
  }),
  active: zod.boolean(),
  email: zod.string().email("Informe um e-mail válido"),
  password: zod.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  userAddress: zod.object({
    zipCode: zod.string().length(8, "CEP é obrigatório"),
    street: zod.string().min(1, "Rua deve possuir mais de 1 caractere"),
    numberAddress: zod.number().int().positive("Número deve ser positivo"),
    neighborhood: zod
      .string()
      .min(1, "Bairro deve possuir mais de 1 caractere"),
    city: zod.string().min(1, "Cidade deve possuir mais de 1 caractere"),
    state: zod.string().min(1, "Estado deve possuir mais de 1 caractere"),
  }),
});

type UserProfileFormData = zod.infer<typeof userProfileSchema>;

export function UserForm() {
  const location = useLocation();
  const user = location.state?.user;
  const { update, getUserById } = useContext(UserContext);

  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        const data = (await getUserById(user.id)) as User;
        if (data) {
          setUserData(data);
        }
      }
    };
    fetchUserData();
  }, [user, getUserById]);

  const formatCpf = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: userData?.name || "",
      gender: userData?.gender || GenderType.MALE,
      birthDate: userData?.birthDate || "",
      active: userData?.active || true,
      email: userData?.email || "",
      cpf: userData?.cpf || "",
      password: "",
      userAddress: {
        zipCode: userData?.userAddress?.zipCode || "",
        street: userData?.userAddress?.street || "",
        numberAddress: userData?.userAddress?.numberAddress || 0,
        neighborhood: userData?.userAddress?.neighborhood || "",
        city: userData?.userAddress?.city || "",
        state: userData?.userAddress?.state || "",
      },
    },
  });

  const zipCode = watch("userAddress.zipCode");
  const address = useFetchAddress(zipCode ?? "");

  useEffect(() => {
    setValue("userAddress.street", address.street);
    setValue("userAddress.neighborhood", address.neighborhood);
    setValue("userAddress.city", address.city);
    setValue("userAddress.state", address.state);
  }, [address, setValue]);

  useEffect(() => {
    if (userData) {
      setValue("name", userData.name);
      setValue("gender", userData.gender);
      setValue("birthDate", userData.birthDate);
      setValue("email", userData.email);
      setValue("cpf", userData.cpf);
      if (userData.userAddress) {
        setValue("userAddress.zipCode", userData.userAddress.zipCode);
        setValue("userAddress.street", userData.userAddress.street);
        setValue(
          "userAddress.numberAddress",
          userData.userAddress.numberAddress
        );
        setValue("userAddress.neighborhood", userData.userAddress.neighborhood);
        setValue("userAddress.city", userData.userAddress.city);
        setValue("userAddress.state", userData.userAddress.state);
      }
    }
  }, [userData, setValue]);

  const onSubmit: SubmitHandler<UserProfileFormData> = async (data) => {
    if (user?.id) {
      await update(user.id, data);
    }
  };

  return (
    <>
      <Header currentPage={"dashboard"} />
      <UpdateContainer>
        <UpdateContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <FieldWrapper>
                <Input type="text" {...register("name")} placeholder="Nome" />
                {errors.name && (
                  <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
              </FieldWrapper>
              <FieldWrapper>
                <Input
                  type="text"
                  value={formatCpf(watch("cpf"))}
                  placeholder="CPF"
                  disabled
                />
                {errors.cpf && (
                  <ErrorMessage>{errors.cpf.message}</ErrorMessage>
                )}
              </FieldWrapper>
            </Row>
            <FieldWrapper>
              <Input type="text" {...register("email")} placeholder="E-mail" />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </FieldWrapper>
            <FieldWrapper>
              <Input
                type="password"
                {...register("password")}
                placeholder="Senha"
              />
              {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </FieldWrapper>
            <Row>
              <FieldWrapper>
                <Input
                  type="date"
                  {...register("birthDate")}
                  placeholder="Data de Nascimento"
                />
                {errors.birthDate && (
                  <ErrorMessage>{errors.birthDate.message}</ErrorMessage>
                )}
              </FieldWrapper>
              <FieldWrapper>
                <StyledSelect {...register("gender")}>
                  <option value="MALE">Masculino</option>
                  <option value="FEMALE">Feminino</option>
                </StyledSelect>
                {errors.gender && (
                  <ErrorMessage>{errors.gender.message}</ErrorMessage>
                )}
              </FieldWrapper>
            </Row>
            <FieldWrapper>
              <Input
                type="text"
                {...register("userAddress.zipCode")}
                placeholder="CEP"
              />
              {errors.userAddress?.zipCode && (
                <ErrorMessage>
                  {errors.userAddress.zipCode.message}
                </ErrorMessage>
              )}
            </FieldWrapper>
            <FieldWrapper>
              <Input
                type="number"
                {...register("userAddress.numberAddress", {
                  valueAsNumber: true,
                })}
                placeholder="Número"
              />
              {errors.userAddress?.numberAddress && (
                <ErrorMessage>
                  {errors.userAddress.numberAddress.message}
                </ErrorMessage>
              )}
            </FieldWrapper>
            <Row>
              <FieldWrapper>
                <Input
                  {...register("userAddress.street")}
                  placeholder="Logradouro"
                />
                {errors.userAddress?.street && (
                  <ErrorMessage>
                    {errors.userAddress.street.message}
                  </ErrorMessage>
                )}
              </FieldWrapper>
            </Row>
            <Row>
              <FieldWrapper>
                <Input
                  {...register("userAddress.neighborhood")}
                  placeholder="Bairro"
                />
                {errors.userAddress?.neighborhood && (
                  <ErrorMessage>
                    {errors.userAddress.neighborhood.message}
                  </ErrorMessage>
                )}
              </FieldWrapper>
              <FieldWrapper>
                <Input {...register("userAddress.city")} placeholder="Cidade" />
                {errors.userAddress?.city && (
                  <ErrorMessage>{errors.userAddress.city.message}</ErrorMessage>
                )}
              </FieldWrapper>
              <FieldWrapper>
                <Input
                  {...register("userAddress.state")}
                  placeholder="Estado"
                />
                {errors.userAddress?.state && (
                  <ErrorMessage>
                    {errors.userAddress.state.message}
                  </ErrorMessage>
                )}
              </FieldWrapper>
            </Row>
            <Buttons>
              <button type="submit">Salvar</button>
              <LinkProfile to="/profile">Voltar</LinkProfile>
            </Buttons>
          </form>
        </UpdateContent>
      </UpdateContainer>
    </>
  );
}
