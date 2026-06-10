// utils/validators.ts

import type { FormErrors, RegisterForm, LoginErrors, LoginForm } from "../types";
import { onlyDigits } from "./masks";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateCpf = (cpf: string): boolean => {
  const digits = onlyDigits(cpf);

  if (digits.length !== 11 || /^(\d)\1+$/.test(digits)) {
    return false;
  }

  const calcDigit = (factor: number) => {
    let total = 0;

    for (let i = 0; i < factor - 1; i++) {
      total += Number(digits[i]) * (factor - i);
    }

    const result = (total * 10) % 11;

    return result === 10 ? 0 : result;
  };

  return (
    calcDigit(10) === Number(digits[9]) && calcDigit(11) === Number(digits[10])
  );
};

export const validateRegisterForm = (data: RegisterForm): FormErrors => {
  const errors: FormErrors = {};

  const fullName = data.full_name.trim();
  const email = data.email.trim();
  const city = data.city.trim();
  const parish = data.parish.trim();

  if (!fullName) {
    errors.full_name = "Informe o nome completo.";
  } else if (fullName.length < 5) {
    errors.full_name = "O nome deve ter ao menos 5 caracteres.";
  } else if (fullName.length > 150) {
    errors.full_name = "O nome deve ter no máximo 150 caracteres.";
  }

  if (!data.cpf) {
    errors.cpf = "Informe o CPF.";
  } else if (!validateCpf(data.cpf)) {
    errors.cpf = "CPF inválido.";
  }

  if (!email) {
    errors.email = "Informe o email.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Email inválido.";
  } else if (email.length > 255) {
    errors.email = "Email muito grande.";
  }

  const phone = onlyDigits(data.phone);

  if (!phone) {
    errors.phone = "Informe o telefone.";
  } else if (!/^\d{10,11}$/.test(phone)) {
    errors.phone = "Telefone inválido.";
  }

  if (!city) {
    errors.city = "Informe a cidade.";
  } else if (city.length < 2) {
    errors.city = "Cidade inválida.";
  } else if (city.length > 100) {
    errors.city = "Cidade muito grande.";
  }

  if (!parish) {
    errors.parish = "Informe a paróquia.";
  } else if (parish.length < 2) {
    errors.parish = "Paróquia inválida.";
  } else if (parish.length > 150) {
    errors.parish = "Paróquia muito grande.";
  }

  if (data.emergency_contact && data.emergency_contact.length > 255) {
    errors.emergency_contact = "Contato de emergência muito grande.";
  }

  return errors;
};

export const validateLoginForm = (
  data: LoginForm
): LoginErrors => {
  const errors: LoginErrors = {};

  const email = data.email.trim();
  const password = data.password;

  if (!email) {
    errors.email = "Informe o email.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Email inválido.";
  } else if (email.length > 255) {
    errors.email = "Email muito grande.";
  }

  if (!password) {
    errors.password = "Informe a senha.";
  } else if (password.length < 8) {
    errors.password = "Senha inválida.";
  }

  return errors;
};