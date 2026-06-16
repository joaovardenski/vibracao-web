import { useState } from "react";
import axios from "axios";

import api from "../../../services/api";

import type { FormErrors, RegisterForm, RegistrationResponse } from "../types/participantsTypes";

import { sanitizeRegisterForm } from "../../../shared/sanitizers/sharedSanitizers";
import { validateRegisterForm } from "../../../shared/validators/sharedValidators";

const INITIAL: RegisterForm = {
  full_name: "",
  cpf: "",
  email: "",
  phone: "",
  city: "",
  parish: "",
  emergency_contact: "",
};

export function useRegisterForm() {
  const [form, setForm] = useState<RegisterForm>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const updateField = (field: keyof RegisterForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setServerError(null);

    const validationErrors = validateRegisterForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      const firstError = Object.keys(validationErrors)[0];

      document.getElementById(firstError)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      return;
    }

    setLoading(true);

    try {
      const payload = sanitizeRegisterForm(form);

      const { data } = await api.post<{
        data: RegistrationResponse;
      }>("/registrations", payload);

      window.location.href = data.data.preference.init_point;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const apiErrors = err.response?.data?.errors;

        if (apiErrors) {
          const mapped: FormErrors = {};

          for (const field in apiErrors) {
            mapped[field as keyof RegisterForm] = apiErrors[field][0];
          }

          setErrors(mapped);
        } else {
          setServerError(
            err.response?.data?.message ?? "Erro ao realizar inscrição.",
          );
        }
      } else {
        setServerError("Erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    errors,
    loading,
    serverError,
    updateField,
    handleSubmit,
  };
}
