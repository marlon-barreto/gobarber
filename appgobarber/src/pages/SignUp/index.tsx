import React, { useCallback, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErros';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import LogoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  BackToSignButton,
  BackToSignButtonText,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const passwordInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);

  const handledSignup = useCallback(async (data: SignUpFormData) => {
    try {
      // Limpa os erros
      formRef.current?.setErrors({});

      // Validacao Yup
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatorio'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .required('Senha e obrigatório')
          .min(6, 'No minimo 6 digitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);

      Alert.alert(
        'Cadastro realizado com sucesso!',
        'Voce ja pode fazer login na aplicacao!',
      );

      navigation.goBack();
      // redireciona para login
      // history.push('/');

      // Dispara um mensagem
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      }

      // disparar um toast

      Alert.alert('Erro no cadastro', 'Ocorreu um erro ao fazer o cadastro');
    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={LogoImg} />
            <View>
              <Title>Crie sua conta</Title>
            </View>
            <Form ref={formRef} onSubmit={handledSignup}>
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />

              <Input
                ref={emailInputRef}
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                textContentType="newPassword"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSignButton
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignButtonText>Voltar para logon</BackToSignButtonText>
      </BackToSignButton>
    </>
  );
};

export default SignUp;
