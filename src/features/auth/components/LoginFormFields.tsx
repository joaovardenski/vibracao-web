import { Mail, Lock, ArrowRight } from "lucide-react";
import LoadingSpinner from "../../../shared/components/LoadingSpiner";

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
  const baseInputStyle = "w-full rounded-xl border bg-gray-50/50 pl-11 pr-4 py-3.5 text-sm font-medium text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400/80";
  const errorInputStyle = "border-red-300 bg-red-50/10 focus:border-red-500 focus:ring-4 focus:ring-red-100";
  const normalInputStyle = "border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100";

  return (
    <>
      {/* Campo: Email */}
      <div className="group">
        <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500 transition-colors group-focus-within:text-indigo-600">
          E-mail
        </label>
        <div className="relative flex items-center">
          <span className="absolute left-4 text-gray-400 transition-colors group-focus-within:text-indigo-500">
            <Mail size={18} />
          </span>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="exemplo@email.com"
            className={`${baseInputStyle} ${errors.email ? errorInputStyle : normalInputStyle}`}
          />
        </div>
        {errors.email && (
          <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
            <span>•</span> {errors.email}
          </p>
        )}
      </div>

      {/* Campo: Senha */}
      <div className="group">
        <label htmlFor="password" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500 transition-colors group-focus-within:text-indigo-600">
          Senha
        </label>
        <div className="relative flex items-center">
          <span className="absolute left-4 text-gray-400 transition-colors group-focus-within:text-indigo-500">
            <Lock size={18} />
          </span>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
            placeholder="••••••••"
            className={`${baseInputStyle} ${errors.password ? errorInputStyle : normalInputStyle}`}
          />
        </div>
        {errors.password && (
          <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
            <span>•</span> {errors.password}
          </p>
        )}
      </div>

      {/* Botão de Envio */}
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
    </>
  );
}