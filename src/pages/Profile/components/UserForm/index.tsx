import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { FormGroup, FormWrapper } from './styles';
import { ButtonGroup } from '../../styles';

const userProfileSchema = zod.object({
  name: zod.string().min(1, "Informe o nome"),
  gender: zod.enum(['male', 'female'], { required_error: "Informe o sexo" }),
  birthDate: zod.string().refine((val) => !isNaN(Date.parse(val)), "Informe uma data válida"),
  email: zod.string().email("Informe um e-mail válido"),
});

type UserProfileFormData = zod.infer<typeof userProfileSchema>;

export function UserForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: "",
      gender: "male",
      birthDate: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<UserProfileFormData> = data => {
    console.log(data);
    // Lógica para enviar os dados editados para o servidor
  };

  const handleDeleteAccount = () => {
    // Lógica para deletar a conta
    console.log('Conta deletada');
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <label htmlFor="name">Nome</label>
          <input id="name" {...register('name')} />
          {errors.name && <span>{errors.name.message}</span>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="gender">Sexo</label>
          <select id="gender" {...register('gender')}>
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
          </select>
          {errors.gender && <span>{errors.gender.message}</span>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="birthDate">Data de Nascimento</label>
          <input type="date" id="birthDate" {...register('birthDate')} />
          {errors.birthDate && <span>{errors.birthDate.message}</span>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" {...register('email')} />
          {errors.email && <span>{errors.email.message}</span>}
        </FormGroup>

        <ButtonGroup>
          <button type="submit">Salvar</button>
          <button type="button" onClick={handleDeleteAccount}>Deletar Conta</button>
        </ButtonGroup>
      </form>
    </FormWrapper>
  );
}
