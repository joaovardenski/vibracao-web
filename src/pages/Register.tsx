import { useState } from "react";
import {
  User,
  IdCard,
  Phone,
  Mail,
  MapPin,
  Church,
  HeartHandshake,
  ArrowRight,
  ArrowLeft,
  Lock,
  QrCode,
} from "lucide-react";
import { maskCpf, maskPhone } from "../utils/masks";
import FormField from "../components/FormField";
import { useRegisterForm } from "../hooks/useRegisterForm";
import logoDioceseUV from "../assets/dioceseUV.png";

export default function Register() {
  const { form, errors, loading, serverError, updateField, handleSubmit } =
    useRegisterForm();

  // Controle de passos para não entulhar a tela do celular
  const [step, setStep] = useState<1 | 2>(1);

  // Validação local simples para permitir avançar de passo no mobile
  const canGoToStep2 = () => {
    return (
      form.full_name.trim().length >= 5 &&
      form.cpf.replace(/\D/g, "").length === 11 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
      form.phone.replace(/\D/g, "").length >= 10
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Container Principal */}
      <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-purple-100/80 bg-white/90 backdrop-blur-md shadow-2xl transition-all duration-300">
        {/* Header Dinâmico e Vibrante */}
        <div className="relative overflow-hidden bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-8 text-center text-white">
          <div className="absolute top-0 left-0 h-full w-full opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[16px_16px]" />

          {/* LOGO DA DIOCESE AQUI */}
          <div className="flex justify-center mb-4">
            <img
              src={logoDioceseUV}
              alt="Diocese de União da Vitória"
              className="h-14 w-auto object-contain opacity-90"
            />
          </div>

          {/* Badge Ano */}
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-pink-100 backdrop-blur-sm mb-2">
            Inscrições Abertas
          </span>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl drop-shadow-sm bg-clip-text">
            Vibração Jovem 2026
          </h1>

          {/* Barra de Progresso Visual Interativa */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <div
              className={`h-2 w-16 rounded-full transition-all duration-300 ${step === 1 ? "bg-white w-24" : "bg-white/40"}`}
            />
            <div
              className={`h-2 w-16 rounded-full transition-all duration-300 ${step === 2 ? "bg-white w-24" : "bg-white/40"}`}
            />
          </div>
        </div>

        {/* Corpo do Formulário */}
        <div className="p-6 sm:p-8">
          {serverError && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-700 animate-shake">
              <span className="text-lg">⚠️</span>
              <p className="font-semibold">{serverError}</p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            noValidate
          >
            {/* PASSO 1: Identificação Básica */}
            {step === 1 && (
              <div className="flex flex-col gap-5 animate-fadeIn">
                <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                  Passo 1 de 2: Quem é você?
                </div>

                <FormField
                  id="full_name"
                  label={
                    <span className="flex items-center gap-2">
                      <User size={16} className="text-indigo-500" /> Nome
                      completo
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
                        <Phone size={16} className="text-indigo-500" /> Telefone
                        / WhatsApp
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

                {/* Botão Próximo (Mobile amigável - Dedão) */}
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!canGoToStep2()}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-indigo-100 transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuar inscrição <ArrowRight size={18} />
                </button>
              </div>
            )}

            {/* PASSO 2: Localização e Emergência */}
            {step === 2 && (
              <div className="flex flex-col gap-5 animate-fadeIn">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    Passo 2 de 2: De onde você vem?
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-indigo-600 transition"
                  >
                    <ArrowLeft size={14} /> Voltar ao passo 1
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormField
                    id="city"
                    label={
                      <span className="flex items-center gap-2">
                        <MapPin size={16} className="text-indigo-500" /> Cidade
                      </span>
                    }
                    value={form.city}
                    error={errors.city}
                    placeholder="Ex: União da Vitória"
                    onChange={(value) => updateField("city", value)}
                  />

                  <FormField
                    id="parish"
                    label={
                      <span className="flex items-center gap-2">
                        <Church size={16} className="text-indigo-500" />{" "}
                        Paróquia / Comunidade
                      </span>
                    }
                    value={form.parish}
                    error={errors.parish}
                    placeholder="Ex: Nossa Senhora de Fátima"
                    onChange={(value) => updateField("parish", value)}
                  />
                </div>

                <FormField
                  id="emergency_contact"
                  label={
                    <span className="flex items-center gap-2">
                      <HeartHandshake size={16} className="text-indigo-500" />{" "}
                      Contato de emergência (Opcional)
                    </span>
                  }
                  value={form.emergency_contact ?? ""}
                  error={errors.emergency_contact}
                  placeholder="Nome do responsável e telefone"
                  onChange={(value) => updateField("emergency_contact", value)}
                />

                {/* Botão de Envio Principal */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-4 text-base font-black text-white shadow-xl shadow-indigo-200 transition-all duration-150 hover:from-indigo-700 hover:to-purple-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
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
                      <span>Processando Vaga...</span>
                    </>
                  ) : (
                    <>Confirmar e Ir para o Pagamento ⚡</>
                  )}
                </button>
              </div>
            )}

            {/* Rodapé de Confiança / Segurança */}
            <div className="mt-2 flex items-center justify-center gap-4 text-center text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Lock size={12} className="text-emerald-500" /> Conexão Segura
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <QrCode size={12} className="text-indigo-400" /> Pix
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
