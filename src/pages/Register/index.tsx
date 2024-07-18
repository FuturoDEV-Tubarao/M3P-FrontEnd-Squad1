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
  birthDate: zod.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Data inválida",
  }),
  email: zod.string().min(5, "Informe um e-mail válido"),
  password: zod.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  contactAddress: zod.object({
    zipCode: zod.string().min(8, "CEP é obrigatório"),
    street: zod.string().min(1, "Rua é obrigatória"),
    number_address: zod.number().int().positive("Número deve ser positivo"),
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
      email: "",
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

  const { signup } = useContext(RegisterContext);

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
              {...register("contactAddress.number_address")}
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
          <Button type="submit">Cadastrar</Button>
        </form>
      </GlassCard>
    </RegisterContainer>
  );
}
