import { Mail, Lock, ShieldCheck, ArrowRight, AlertCircle } from "lucide-react";
import logoDioceseUV from "../../../assets/dioceseUV.png";
import { useLoginForm } from "../hooks/useLoginForm";

export default function Login() {
  const { form, errors, loading, serverError, updateField, handleSubmit } = useLoginForm();

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col items-center justify-start sm:justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
      {/* Container Principal */}
      <div className="w-full max-w-md rounded-3xl border border-purple-100/80 bg-white/90 backdrop-blur-md shadow-2xl transition-all duration-300 my-auto">
        {/* Header Dinâmico */}
        <div className="relative overflow-hidden rounded-t-3xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-8 text-center text-white">
          <div className="absolute top-0 left-0 h-full w-full opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[16px_16px]" />

          <div className="flex justify-center mb-4">
            <img
              src={logoDioceseUV}
              alt="Diocese de União da Vitória"
              className="h-14 w-auto object-contain opacity-95 filter drop-shadow-sm"
            />
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-pink-100 backdrop-blur-sm mb-3">
            <ShieldCheck size={13} className="text-pink-200" />
            Área Restrita
          </span>

          <h1 className="text-3xl font-black tracking-tight drop-shadow-sm">
            Vibração Jovem 2026
          </h1>

          <p className="mt-1 text-indigo-200/90 text-xs font-bold uppercase tracking-widest">
            Painel Administrativo
          </p>
        </div>

        {/* Corpo do Formulário */}
        <div className="p-6 sm:p-8">
          {/* Alerta de Erro do Servidor */}
          {serverError && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-700 animate-in fade-in slide-in-from-top-1 duration-200">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Erro de autenticação</p>
                <p className="text-red-600/90 text-xs mt-0.5">{serverError}</p>
              </div>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            noValidate
          >
            {/* Campo: Email */}
            <div className="group">
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500 transition-colors group-focus-within:text-indigo-600"
              >
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
                  className={`w-full rounded-xl border bg-gray-50/50 pl-11 pr-4 py-3.5 text-sm font-medium text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400/80 ${
                    errors.email
                      ? "border-red-300 bg-red-50/10 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      : "border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  }`}
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
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500 transition-colors group-focus-within:text-indigo-600"
              >
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
                  className={`w-full rounded-xl border bg-gray-50/50 pl-11 pr-4 py-3.5 text-sm font-medium text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400/80 ${
                    errors.password
                      ? "border-red-300 bg-red-50/10 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      : "border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  }`}
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
                  <svg
                    className="h-5 w-5 animate-spin text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Autenticando...</span>
                </>
              ) : (
                <>
                  Acessar Painel <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Rodapé */}
          <div className="mt-8 text-center text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            SGE • Diocese de União da Vitória
          </div>
        </div>
      </div>
    </div>
  );
}
