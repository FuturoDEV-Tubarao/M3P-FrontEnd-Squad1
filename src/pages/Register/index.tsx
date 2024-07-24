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
} from "./styles";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useFetchAddress } from "../../utils/useFetchAddress";

enum GenderType {
  FEMALE = "FEMALE",
  MALE = "MALE",
}

const userProfileSchema = zod.object({
  name: zod.string().min(1, "Informe o nome"),
  gender: zod.nativeEnum(GenderType, {
    required_error: "Informe uma categoria",
  }),
  cpf: zod.string().min(11, "Informe um CPF válido"),
  birthDate: zod.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Data inválida",
  }),
  active: zod.boolean(),
  email: zod.string().min(5, "Informe um e-mail válido"),
  password: zod.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  userAddress: zod.object({
    zipCode: zod.string().min(8, "CEP é obrigatório"),
    street: zod.string().min(1, "Rua é obrigatória"),
    numberAddress: zod.number().int().positive("Número deve ser positivo"),
    neighborhood: zod.string().min(1, "Bairro é obrigatório"),
    city: zod.string().min(1, "Cidade é obrigatória"),
    state: zod.string().min(1, "Estado é obrigatório"),
  }),
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
      active: true,
      email: "",
      password: "",
      userAddress: {
        zipCode: "",
        street: "",
        numberAddress: 0,
        neighborhood: "",
        city: "",
        state: "",
      },
    },
  });

  const { signup } = useContext(UserContext);

  const zipCode = watch("userAddress.zipCode");
  const address = useFetchAddress(zipCode);

  useEffect(() => {
    setValue("userAddress.street", address.street);
    setValue("userAddress.neighborhood", address.neighborhood);
    setValue("userAddress.city", address.city);
    setValue("userAddress.state", address.state);
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
              <ErrorMessage>{errors.userAddress.zipCode.message}</ErrorMessage>
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
                value={address.street}
                placeholder="Logradouro"
              />
              {errors.userAddress?.street && (
                <ErrorMessage>{errors.userAddress.street.message}</ErrorMessage>
              )}
            </FieldWrapper>
          </Row>
          <Row>
            <FieldWrapper>
              <Input
                {...register("userAddress.neighborhood")}
                value={address.neighborhood}
                placeholder="Bairro"
              />
              {errors.userAddress?.neighborhood && (
                <ErrorMessage>
                  {errors.userAddress.neighborhood.message}
                </ErrorMessage>
              )}
            </FieldWrapper>
            <FieldWrapper>
              <Input
                {...register("userAddress.city")}
                value={address.city}
                placeholder="Cidade"
              />
              {errors.userAddress?.city && (
                <ErrorMessage>{errors.userAddress.city.message}</ErrorMessage>
              )}
            </FieldWrapper>
            <FieldWrapper>
              <Input
                {...register("userAddress.state")}
                value={address.state}
                placeholder="Estado"
              />
              {errors.userAddress?.state && (
                <ErrorMessage>{errors.userAddress.state.message}</ErrorMessage>
              )}
            </FieldWrapper>
          </Row>
          <Button type="submit">Cadastrar</Button>
        </form>
      </GlassCard>
    </RegisterContainer>
  );
}
