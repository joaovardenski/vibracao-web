import { User, IdCard, Phone, Mail, ArrowRight } from "lucide-react";
import { maskCpf, maskPhone } from "../../../shared/masks/sharedMasks";
import FormField from "../components/FormField";
import type {RegisterForm, FormErrors} from "../types/participantsTypes";

interface RegisterStepOneProps {
  form: RegisterForm;
  errors: FormErrors;
  updateField: (
    field: keyof RegisterForm,
    value: string
  ) => void;
  canAdvance: boolean;
  onNextStep: () => void;
}

export default function RegisterStepOne({
  form,
  errors,
  updateField,
  canAdvance,
  onNextStep,
}: RegisterStepOneProps) {
  return (
    <div className="flex flex-col gap-5 animate-fadeIn">
      <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
        Passo 1 de 2: Quem é você?
      </div>

      <FormField
        id="full_name"
        label={
          <span className="flex items-center gap-2">
            <User size={16} className="text-indigo-500" /> Nome completo
          </span>
        }
        value={form.full_name}
        error={errors.full_name}
        placeholder="Digite seu nome completo"
        autoComplete="name"
        onChange={(value) => updateField("full_name", value)}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          id="cpf"
          label={
            <span className="flex items-center gap-2">
              <IdCard size={16} className="text-indigo-500" /> CPF
            </span>
          }
          value={form.cpf}
          error={errors.cpf}
          placeholder="000.000.000-00"
          inputMode="numeric"
          onChange={(value) => updateField("cpf", maskCpf(value))}
        />

        <FormField
          id="phone"
          label={
            <span className="flex items-center gap-2">
              <Phone size={16} className="text-indigo-500" /> Telefone / WhatsApp
            </span>
          }
          value={form.phone}
          error={errors.phone}
          placeholder="(00) 00000-0000"
          inputMode="numeric"
          onChange={(value) => updateField("phone", maskPhone(value))}
        />
      </div>

      <FormField
        id="email"
        label={
          <span className="flex items-center gap-2">
            <Mail size={16} className="text-indigo-500" /> E-mail
          </span>
        }
        type="email"
        value={form.email}
        error={errors.email}
        placeholder="seu.email@exemplo.com"
        autoComplete="email"
        inputMode="email"
        onChange={(value) => updateField("email", value)}
      />

      <button
        type="button"
        onClick={onNextStep}
        disabled={!canAdvance}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-indigo-100 transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continuar inscrição <ArrowRight size={18} />
      </button>
    </div>
  );
}