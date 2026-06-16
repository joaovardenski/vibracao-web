import { useState } from "react";
import {
  X,
  User,
  ShieldAlert,
  Smartphone,
  Mail,
  MapPin,
  Loader2,
} from "lucide-react";
import { isAxiosError } from "axios";
import api from "../../../services/api";
import { maskCpf, maskPhone } from "../../../shared/masks/sharedMasks";
import { validateManualRegistrationForm } from "../../../shared/validators/sharedValidators";
import FormField from "../../../shared/components/FormField";
import type { ManualRegistrationErrors } from "../types/adminTypes";

interface ParticipantFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const INITIAL_FORM_STATE = {
  full_name: "",
  cpf: "",
  email: "",
  phone: "",
  city: "",
  parish: "",
  emergency_contact: "",
};

export default function ParticipantFormModal({
  isOpen,
  onClose,
  onSuccess,
}: ParticipantFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Partial<ManualRegistrationErrors>>({});
  const [serverError, setServerError] = useState("");

  const handleFieldChange = (
    field: keyof typeof INITIAL_FORM_STATE,
    value: string,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");

    const validationErrors = validateManualRegistrationForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      setLoading(true);
      await api.post("/admin/registrations", form);

      setForm(INITIAL_FORM_STATE);
      onSuccess();
      onClose();
    } catch (error: unknown) {
      console.error(error);

      if (
        isAxiosError<{ errors?: Record<string, string[]>; message?: string }>(
          error,
        ) &&
        error.response?.status === 422 &&
        error.response?.data?.errors
      ) {
        const backendErrors = error.response.data.errors;
        const formattedErrors: Partial<ManualRegistrationErrors> = {};

        Object.keys(backendErrors).forEach((field) => {
          formattedErrors[field as keyof ManualRegistrationErrors] =
            backendErrors[field][0];
        });

        setErrors(formattedErrors);
        return;
      }

      const message = isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message
        : undefined;

      setServerError(message || "Erro ao criar inscrição.");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed h-full inset-0 z-50 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={loading ? undefined : onClose}
      />

      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden">
        <div className="bg-white w-full max-w-2xl rounded-t-3xl sm:rounded-2xl shadow-2xl border border-slate-100 flex flex-col max-h-screen sm:max-h-[90vh] transition-all duration-300 transform animate-in fade-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0">
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 shrink-0">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-800 tracking-tight">
                Inscrição Manual
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Registre um novo participante diretamente no painel.
              </p>
            </div>

            <button
              onClick={onClose}
              disabled={loading}
              className="p-2 text-gray-400 hover:bg-slate-50 hover:text-gray-600 rounded-xl transition cursor-pointer disabled:opacity-40"
            >
              <X size={18} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-slate-50/30"
          >
            {serverError && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                <p className="text-sm font-medium text-red-700">
                  {serverError}
                </p>
              </div>
            )}

            <FormField
              id="full_name"
              label={
                <>
                  <User size={16} className="text-indigo-500" /> Nome Completo
                </>
              }
              value={form.full_name}
              error={errors.full_name}
              placeholder="Ex: João da Silva Sauro"
              onChange={(value) => handleFieldChange("full_name", value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField
                id="cpf"
                inputMode="numeric"
                label={
                  <>
                    <User size={16} className="text-indigo-500" /> CPF
                  </>
                }
                value={form.cpf}
                error={errors.cpf}
                placeholder="000.000.000-00"
                onChange={(value) => handleFieldChange("cpf", maskCpf(value))}
              />

              <FormField
                id="phone"
                type="tel"
                inputMode="numeric"
                label={
                  <>
                    <Smartphone size={16} className="text-indigo-500" /> Celular
                    / WhatsApp
                  </>
                }
                value={form.phone}
                error={errors.phone}
                placeholder="(00) 00000-0000"
                onChange={(value) =>
                  handleFieldChange("phone", maskPhone(value))
                }
              />
            </div>

            <FormField
              id="email"
              type="email"
              inputMode="email"
              label={
                <>
                  <Mail size={16} className="text-indigo-500" /> Endereço de
                  E-mail
                </>
              }
              value={form.email}
              error={errors.email}
              placeholder="nome@exemplo.com"
              onChange={(value) => handleFieldChange("email", value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField
                id="city"
                label={
                  <>
                    <MapPin size={16} className="text-indigo-500" /> Cidade
                  </>
                }
                value={form.city}
                error={errors.city}
                placeholder="Sua cidade"
                onChange={(value) => handleFieldChange("city", value)}
              />

              <FormField
                id="parish"
                label={
                  <>
                    <MapPin size={16} className="text-indigo-500" /> Paróquia /
                    Comunidade
                  </>
                }
                value={form.parish}
                error={errors.parish}
                placeholder="Nome da Paróquia"
                onChange={(value) => handleFieldChange("parish", value)}
              />
            </div>

            <FormField
              id="emergency_contact"
              as="textarea"
              label={
                <>
                  <ShieldAlert size={16} className="text-red-500" /> Contato de
                  Emergência (Opcional)
                </>
              }
              value={form.emergency_contact}
              error={errors.emergency_contact}
              placeholder="Nome do contato + Telefone"
              rows={2}
              onChange={(value) =>
                handleFieldChange("emergency_contact", value)
              }
            />

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-4 border-t border-slate-100 shrink-0">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-5 py-3 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 transition hover:bg-slate-50 hover:text-gray-800 disabled:opacity-50 cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-sm font-bold text-white transition hover:bg-indigo-700 shadow-lg shadow-indigo-100 disabled:opacity-70 cursor-pointer"
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                Criar Inscrição
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
