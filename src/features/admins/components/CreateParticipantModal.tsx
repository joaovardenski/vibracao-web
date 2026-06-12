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
import { validateManualRegistrationForm } from "../../../shared/validators/sharedValidators";
import type { ManualRegistrationErrors } from "../../admins/types/adminTypes";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateParticipantModal({ open, onClose }: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    cpf: "",
    email: "",
    phone: "",
    city: "",
    parish: "",
    emergency_contact: "",
  });

  const [errors, setErrors] = useState<Partial<ManualRegistrationErrors>>({});

  const [serverError, setServerError] = useState("");

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

      onClose();

      window.location.reload();
    } catch (error: unknown) {
      console.error(error);

      /*
       * Laravel ValidationException (422)
       */
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

      /*
       * Erros de negócio
       * Ex: participante já possui inscrição ativa
       */
      const message = isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message
        : undefined;

      setServerError(message || "Erro ao criar inscrição.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <>
      {/* Backdrop com transição suave */}
      <div
        className="fixed h-full inset-0 z-50 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={loading ? undefined : onClose}
      />

      {/* Container Centralizador */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden">
        {/* Card do Modal */}
        <div className="bg-white w-full max-w-2xl rounded-t-3xl sm:rounded-2xl shadow-2xl border border-slate-100 flex flex-col max-h-screen sm:max-h-[90vh] transition-all duration-300 transform animate-in fade-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0">
          {/* Header */}
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

          {/* Form com Scroll Customizado */}

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

            {/* Campo: Nome Completo */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <User size={13} className="text-gray-400" /> Nome Completo
              </label>
              <input
                type="text"
                value={form.full_name}
                onChange={(e) => {
                  setForm({
                    ...form,
                    full_name: e.target.value,
                  });

                  if (errors.full_name) {
                    setErrors((prev) => ({
                      ...prev,
                      full_name: undefined,
                    }));
                  }
                }}
                className={`w-full rounded-xl bg-white px-4 py-3 text-sm font-medium outline-none transition focus:ring-4 placeholder:text-gray-400 ${
                  errors.full_name
                    ? "border border-red-300 focus:border-red-500 focus:ring-red-100"
                    : "border border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                }`}
                placeholder="Ex: João da Silva Sauro"
              />
              {errors.full_name && (
                <p className="text-xs text-red-500 mt-1">{errors.full_name}</p>
              )}
            </div>

            {/* Grid Duplo: CPF e Telefone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <User size={13} className="text-gray-400" /> CPF
                </label>
                <input
                  type="text"
                  value={form.cpf}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      cpf: e.target.value,
                    });

                    if (errors.cpf) {
                      setErrors((prev) => ({
                        ...prev,
                        cpf: undefined,
                      }));
                    }
                  }}
                  className={`w-full rounded-xl bg-white px-4 py-3 text-sm font-medium outline-none transition focus:ring-4 ${
                    errors.cpf
                      ? "border border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                  }`}
                />
                {errors.cpf && (
                  <p className="text-xs text-red-500 mt-1">{errors.cpf}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Smartphone size={13} className="text-gray-400" /> Celular /
                  WhatsApp
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => {
                    setForm({ ...form, phone: e.target.value });

                    if (errors.phone) {
                      setErrors((prev) => ({
                        ...prev,
                        phone: undefined,
                      }));
                    }
                  }}
                  className={`w-full rounded-xl bg-white px-4 py-3 text-sm font-medium outline-none transition focus:ring-4 placeholder:text-gray-400 ${
                    errors.phone
                      ? "border border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                  }`}
                  placeholder="(00) 00000-0000"
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Campo: E-mail */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <Mail size={13} className="text-gray-400" /> Endereço de E-mail
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });

                  if (errors.email) {
                    setErrors((prev) => ({
                      ...prev,
                      email: undefined,
                    }));
                  }
                }}
                className={`w-full rounded-xl bg-white px-4 py-3 text-sm font-medium outline-none transition focus:ring-4 placeholder:text-gray-400 ${
                  errors.email
                    ? "border border-red-300 focus:border-red-500 focus:ring-red-100"
                    : "border border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                }`}
                placeholder="nome@exemplo.com"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Grid Duplo: Cidade e Paróquia */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin size={13} className="text-gray-400" /> Cidade
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => {
                    setForm({ ...form, city: e.target.value });

                    if (errors.city) {
                      setErrors((prev) => ({
                        ...prev,
                        city: undefined,
                      }));
                    }
                  }}
                  className={`w-full rounded-xl bg-white px-4 py-3 text-sm font-medium outline-none transition focus:ring-4 placeholder:text-gray-400 ${
                    errors.city
                      ? "border border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                  }`}
                  placeholder="Sua cidade"
                />
                {errors.city && (
                  <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin size={13} className="text-gray-400" /> Paróquia /
                  Comunidade
                </label>
                <input
                  type="text"
                  value={form.parish}
                  onChange={(e) => {
                    setForm({ ...form, parish: e.target.value });

                    if (errors.parish) {
                      setErrors((prev) => ({
                        ...prev,
                        parish: undefined,
                      }));
                    }
                  }}
                  className={`w-full rounded-xl bg-white px-4 py-3 text-sm font-medium outline-none transition focus:ring-4 placeholder:text-gray-400 ${
                    errors.parish
                      ? "border border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                  }`}
                  placeholder="Nome da Paróquia"
                />
                {errors.parish && (
                  <p className="text-xs text-red-500 mt-1">{errors.parish}</p>
                )}
              </div>
            </div>

            {/* Campo: Contato de Emergência */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-red-500 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert size={13} className="text-red-400" /> Contato de
                Emergência (Opcional)
              </label>
              <textarea
                value={form.emergency_contact}
                onChange={(e) => {
                  setForm({ ...form, emergency_contact: e.target.value });

                  if (errors.emergency_contact) {
                    setErrors((prev) => ({
                      ...prev,
                      emergency_contact: undefined,
                    }));
                  }
                }}
                className={`w-full rounded-xl bg-white px-4 py-3 text-sm font-medium outline-none transition focus:ring-4 placeholder:text-gray-400 resize-none ${
                  errors.emergency_contact
                    ? "border border-red-300 focus:border-red-500 focus:ring-red-100"
                    : "border border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                }`}
                placeholder="Nome do contato + Telefone"
                rows={2}
              />
              {errors.emergency_contact && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.emergency_contact}
                </p>
              )}
            </div>

            {/* Footer de Ações interno ao form (fixado abaixo do scroll) */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-4 border-t border-slate-100 shrink-0">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-5 py-3 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 transition hover:bg-slate-50 hover:text-gray-800 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-sm font-bold text-white transition hover:bg-indigo-700 active:scale-[0.99] shadow-lg shadow-indigo-100 disabled:opacity-70 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Confirmar Inscrição"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
