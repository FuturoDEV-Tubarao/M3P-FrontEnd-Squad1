import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  Button,
  ErrorMessage,
  GlassCard,
  RegisterContainer,
  Row,
  Input,
  Title,
  SubHeader,
  StyledSelect,
  FieldWrapper,
} from "./styles"; // Certifique-se de ajustar o caminho conforme necessário
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { RegisterContext } from "../../context/RegisterContext";

enum GenderType {
  FEMALE = "FEMALE",
  MALE = "MALE",
}

// Definindo o esquema de validação com Zod
const userProfileSchema = zod.object({
  name: zod.string().min(1, "Informe o nome"),
  gender: zod.nativeEnum(GenderType, {
    required_error: "Informe uma categoria",
  }),
  cpf: zod.string().min(11, "Informe um CPF válido"),
  birthDate: zod.string(),
  email: zod.string().min(5, "Informe um e-mail válido"),
  password: zod.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  zipCode: zod.string().length(8, "Informe um CEP válido"),
  street: zod.string(),
  number: zod.string(),
  // complement: zod.string().optional(),
  neighborhood: zod.string(),
  city: zod.string(),
  state: zod.string(),
});

type UserFormData = zod.infer<typeof userProfileSchema>;

export function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<UserFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: "",
      gender: GenderType.MALE,
      cpf: "",
      birthDate: "",
      email: "",
      password: "",
      zipCode: "",
      street: "",
      number: "",
      // complement: "",
      neighborhood: "",
      city: "",
      state: "",
    },
  });

  const { signup } = useContext(RegisterContext);

  const zipCode = watch("zipCode");
  const [address, setAddress] = useState({
    street: "",
    neighborhood: "",
    city: "",
    state: "",
    // complement: ''
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
              // complement: data.complemento
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
    setValue("street", address.street);
    // setValue('complement', address.complement);
    setValue("neighborhood", address.neighborhood);
    setValue("city", address.city);
    setValue("state", address.state);
  }, [address, setValue]);

  return (
    <RegisterContainer>
      <GlassCard>
        <Title>Cadastro Labfoods</Title>
        <SubHeader>Compartilhe Química de Sabor</SubHeader>
        <form onSubmit={handleSubmit(signup)}>
          <Row>
            <FieldWrapper>
              <Input type="text" {...register("name")} placeholder="Nome" />
              {errors.name && (
                <ErrorMessage>{errors.name.message}</ErrorMessage>
              )}
            </FieldWrapper>
            <FieldWrapper>
              <Input type="text" {...register("cpf")} placeholder="CPF" />
              {errors.cpf && <ErrorMessage>{errors.cpf.message}</ErrorMessage>}
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
                type="text"
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
              {...register("zipCode")}
              value={zipCode}
              onChange={(e: { target: { value: string } }) =>
                setValue("zipCode", e.target.value)
              }
              placeholder="CEP"
            />
            {errors.zipCode && (
              <ErrorMessage>{errors.zipCode.message}</ErrorMessage>
            )}
          </FieldWrapper>
          <FieldWrapper>
            <Input type="text" {...register("number")} placeholder="number" />
            {errors.zipCode && (
              <ErrorMessage>{errors.zipCode.message}</ErrorMessage>
            )}
          </FieldWrapper>

          <Row>
            <FieldWrapper>
              <Input
                {...register("street")}
                value={address.street}
                placeholder="Logradouro"
              />
              {errors.street && (
                <ErrorMessage>{errors.street.message}</ErrorMessage>
              )}
            </FieldWrapper>
            {/* <FieldWrapper>
              <Input {...register("complement")} value={address.complement} placeholder="Complemento" />
              {errors.complement && <ErrorMessage>{errors.complement.message}</ErrorMessage>}
            </FieldWrapper> */}
          </Row>
          <Row>
            <FieldWrapper>
              <Input
                {...register("neighborhood")}
                value={address.neighborhood}
                placeholder="Bairro"
              />
              {errors.neighborhood && (
                <ErrorMessage>{errors.neighborhood.message}</ErrorMessage>
              )}
            </FieldWrapper>
            <FieldWrapper>
              <Input
                {...register("city")}
                value={address.city}
                placeholder="Cidade"
              />
              {errors.city && (
                <ErrorMessage>{errors.city.message}</ErrorMessage>
              )}
            </FieldWrapper>
            <FieldWrapper>
              <Input
                {...register("state")}
                value={address.state}
                placeholder="Estado"
              />
              {errors.state && (
                <ErrorMessage>{errors.state.message}</ErrorMessage>
              )}
            </FieldWrapper>
          </Row>
          <Button type="submit">Cadastrar</Button>
        </form>
      </GlassCard>
    </RegisterContainer>
  );
}
