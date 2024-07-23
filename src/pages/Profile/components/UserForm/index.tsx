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
  contactAddress: {
    zipCode: string;
    street: string;
    number_address: number;
    neighborhood: string;
    city: string;
    state: string;
  };
}

const userProfileSchema = zod.object({
  name: zod.string().min(1, "Informe o nome"),
  gender: zod.nativeEnum(GenderType, {
    required_error: "Informe uma categoria",
  }),
  cpf: zod.string().length(11, "Informe um CPF válido"),
  birthDate: zod.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Data inválida",
  }),
  active: zod.boolean(),
  email: zod.string().email("Informe um e-mail válido"),
  password: zod.string().min(5, "A senha deve ter no mínimo 5 caracteres"),
  contactAddress: zod.object({
    zipCode: zod.string().length(8, "CEP é obrigatório"),
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
      active: true,
      email: userData?.email || "",
      cpf: userData?.cpf || "",
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
  const address = useFetchAddress(zipCode);

  useEffect(() => {
    setValue("contactAddress.street", address.street);
    setValue("contactAddress.neighborhood", address.neighborhood);
    setValue("contactAddress.city", address.city);
    setValue("contactAddress.state", address.state);
  }, [address, setValue]);

  useEffect(() => {
    if (userData) {
      setValue("name", userData.name);
      setValue("gender", userData.gender);
      setValue("birthDate", userData.birthDate);
      setValue("email", userData.email);
      setValue("cpf", userData.cpf);
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
                {...register("contactAddress.zipCode")}
                placeholder="CEP"
              />
              {errors.contactAddress?.zipCode && (
                <ErrorMessage>
                  {errors.contactAddress.zipCode.message}
                </ErrorMessage>
              )}
            </FieldWrapper>
            <FieldWrapper>
              <Input
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
            </FieldWrapper>
            <Row>
              <FieldWrapper>
                <Input
                  {...register("contactAddress.street")}
                  value={address.street}
                  placeholder="Logradouro"
                />
                {errors.contactAddress?.street && (
                  <ErrorMessage>
                    {errors.contactAddress.street.message}
                  </ErrorMessage>
                )}
              </FieldWrapper>
            </Row>
            <Row>
              <FieldWrapper>
                <Input
                  {...register("contactAddress.neighborhood")}
                  value={address.neighborhood}
                  placeholder="Bairro"
                />
                {errors.contactAddress?.neighborhood && (
                  <ErrorMessage>
                    {errors.contactAddress.neighborhood.message}
                  </ErrorMessage>
                )}
              </FieldWrapper>
              <FieldWrapper>
                <Input
                  {...register("contactAddress.city")}
                  value={address.city}
                  placeholder="Cidade"
                />
                {errors.contactAddress?.city && (
                  <ErrorMessage>
                    {errors.contactAddress.city.message}
                  </ErrorMessage>
                )}
              </FieldWrapper>
              <FieldWrapper>
                <Input
                  {...register("contactAddress.state")}
                  value={address.state}
                  placeholder="Estado"
                />
                {errors.contactAddress?.state && (
                  <ErrorMessage>
                    {errors.contactAddress.state.message}
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
