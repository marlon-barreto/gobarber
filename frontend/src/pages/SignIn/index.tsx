import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';

import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import getValidationErrors from '../../utils/getValidationErros';

import loggoImg from '../../assets/logo.svg';

// Stylo
import { Container, Content, AnimationContainer, Background } from './styles';

// Componentes
import Input from '../../components/Input';
import Button from '../../components/Button';

// Objeto de contexto.
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SingInFornData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  // Variavel de contexto
  const { signIn } = useAuth();

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SingInFornData) => {
      try {
        // Limpa os erros
        formRef.current?.setErrors({});

        // Validacao Yup
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        // redireciona para tela incial
        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        // disparar um toast
        addToast({
          type: 'error',
          title: 'Erro na autenticacao',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={loggoImg} alt="Gobarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faca seu login</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Entrar</Button>

            <a href="forgot">Esqueci minha Senha</a>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
