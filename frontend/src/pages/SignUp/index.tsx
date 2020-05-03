import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import * as Yup from 'yup';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErros';

import loggoImg from '../../assets/logo.svg';

// Stylo
import { Container, Content, Background, AnimationContainer } from './styles';

// Componentes
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        // Limpa os erros
        formRef.current?.setErrors({});

        // Validacao Yup
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatorio'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No minimo 6 digitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        // redireciona para login
        history.push('/');

        // disparar um toast
        addToast({
          type: 'success',
          title: 'Cadastro realizado com sucesso',
          description: 'Voce ja pode fazer seu logon no Gobarber!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        // disparar um toast
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer o cadastro',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={loggoImg} alt="Gobarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faca seu seu cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para Login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
