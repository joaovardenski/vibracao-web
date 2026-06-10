// hooks/useLoginForm.ts

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "./useAuth";

import type {
  LoginForm,
  LoginErrors,
} from "../types";

import { validateLoginForm } from "../utils/validators";

const INITIAL: LoginForm = {
  email: "",
  password: "",
};

export function useLoginForm() {
  const navigate = useNavigate();
  const { loadUser } = useAuth();

  const [form, setForm] =
    useState<LoginForm>(INITIAL);

  const [errors, setErrors] =
    useState<LoginErrors>({});

  const [loading, setLoading] =
    useState(false);

  const [serverError, setServerError] =
    useState<string | null>(null);

  const updateField = (
    field: keyof LoginForm,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setServerError(null);

    const validationErrors =
      validateLoginForm(form);

    if (
      Object.keys(validationErrors).length > 0
    ) {
      setErrors(validationErrors);

      const firstError =
        Object.keys(validationErrors)[0];

      document
        .getElementById(firstError)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

      return;
    }

    setLoading(true);

    try {
        const response = await api.post(
            "/login",
            form
        );

        console.log(response.data);

        localStorage.setItem(
            "access_token_vj2026",
            response.data.token
        );

        await loadUser();

        navigate("/admin/dashboard");

        } catch (err) {
        console.error(err);

        if (axios.isAxiosError(err)) {
            setServerError(
            err.response?.data?.message ??
            "Falha ao realizar login."
            );
        } else {
            setServerError(
            err instanceof Error
                ? err.message
                : "Erro inesperado."
            );
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