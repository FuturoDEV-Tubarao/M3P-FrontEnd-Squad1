import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  Button,
  GlassCard,
  Input,
  LoginContainer,
  Title,
  ErrorMessage,
} from "./styles";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Header } from "../../components/Header";

const loginSchema = zod.object({
  email: zod.string().email("Informe um e-mail válido"),
  password: zod.string().min(4, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = zod.infer<typeof loginSchema>;

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login /*logout*/ } = useContext(AuthContext);

  return (
    <>
    <Header currentPage={"home"}/>
    <LoginContainer>
      <GlassCard>
        <Title>Login Labfoods</Title>
        <form onSubmit={handleSubmit(login)}>
          <div>
            <Input type="text" placeholder="email" {...register("email")} />
            <ErrorMessage>
              {errors.email && <span>{errors.email.message}</span>}
            </ErrorMessage>
          </div>
          <div>
            <Input
              type="password"
              placeholder="senha"
              {...register("password")}
            />
            <ErrorMessage>
              {errors.password && <span>{errors.password.message}</span>}
            </ErrorMessage>
          </div>
          <Button type="submit">Login</Button>
        </form>
      </GlassCard>
    </LoginContainer>
    </>
  );
}
