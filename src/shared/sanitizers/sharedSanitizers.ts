// utils/sanitize.ts
import type { RegisterForm } from "../../features/participants/types/participantsTypes";
import { onlyDigits } from "../masks/sharedMasks";

export const sanitizeRegisterForm = (data: RegisterForm): RegisterForm => ({
  ...data,

  full_name: data.full_name.trim(),
  cpf: onlyDigits(data.cpf),
  phone: onlyDigits(data.phone),
  email: data.email.trim().toLowerCase(),
  city: data.city.trim(),
  parish: data.parish.trim(),
  emergency_contact: data.emergency_contact?.trim() || undefined,
});
