import { Mail, Lock, ArrowRight } from "lucide-react";
import LoadingSpinner from "../../../shared/components/LoadingSpiner";
import FormField from "../../../shared/components/FormField";

interface LoginFormFieldsProps {
  form: {
    email: string;
    password: string;
  };
  errors: {
    email?: string;
    password?: string;
  };
  loading: boolean;
  updateField: (field: "email" | "password", value: string) => void;
}

export default function LoginFormFields({ form, errors, loading, updateField }: LoginFormFieldsProps) {
  return (
    <div className="flex flex-col gap-5">
      <FormField
        id="email"
        type="email"
        autoComplete="email"
        label={
          <>
            <Mail size={16} className="text-indigo-500" /> E-mail
          </>
        }
        value={form.email}
        error={errors.email}
        placeholder="exemplo@email.com"
        onChange={(value) => updateField("email", value)}
      />

      <FormField
        id="password"
        type="password"
        autoComplete="current-password"
        label={
          <>
            <Lock size={16} className="text-indigo-500" /> Senha
          </>
        }
        value={form.password}
        error={errors.password}
        placeholder="••••••••"
        onChange={(value) => updateField("password", value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-4 text-base font-black text-white shadow-xl shadow-indigo-100 transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <LoadingSpinner />
            <span>Autenticando...</span>
          </>
        ) : (
          <>
            Acessar Painel <ArrowRight size={18} />
          </>
        )}
      </button>
    </div>
  );
}