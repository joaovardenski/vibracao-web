import { ShieldAlert, ArrowLeft, LogIn, Lock } from "lucide-react";

export default function NotAuthenticated() {
  // Funções simples para navegação (adapte para o seu router, ex: useNavigate() do react-router)
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoToLogin = () => {
    window.location.href = "/login"; // ou a sua rota de login
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-red-50 to-indigo-50 flex flex-col items-center justify-start sm:justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
      
      {/* Container Principal */}
      <div className="w-full max-w-md rounded-3xl border border-red-100/80 bg-white/90 backdrop-blur-md shadow-2xl transition-all duration-300 my-auto overflow-hidden">
        
        {/* Header de Alerta */}
        <div className="relative overflow-hidden bg-linear-to-r from-red-600 via-orange-600 to-indigo-600 px-6 py-10 text-center text-white">
          <div className="absolute top-0 left-0 h-full w-full opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[16px_16px]" />

          {/* Ícone de Escudo Animado */}
          <div className="flex justify-center mb-4">
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-md">
              <ShieldAlert size={40} className="text-red-100" />
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-950/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-red-100 backdrop-blur-sm mb-3">
            Não Autorizado
          </span>

          <h1 className="text-2xl font-black tracking-tight drop-shadow-sm">
            Acesso Restrito
          </h1>
        </div>

        {/* Corpo da Mensagem */}
        <div className="p-6 sm:p-8 text-center">
          <p className="text-sm font-medium text-gray-600 leading-relaxed">
            Ops! Parece que você tentou acessar uma área administrativa do <span className="font-semibold text-indigo-600">Vibração Jovem 2026</span> sem estar devidamente autenticado.
          </p>

          <div className="my-6 rounded-xl border border-amber-100 bg-amber-50/50 p-3.5 text-xs text-amber-700 flex items-center justify-center gap-2 font-medium">
            <Lock size={14} className="shrink-0" />
            Sua tentativa de acesso foi bloqueada por segurança.
          </div>

          {/* Ações / Botões */}
          <div className="flex flex-col gap-3">
            {/* Botão Principal: Ir para o Login */}
            <button
              onClick={handleGoToLogin}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-100 transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 active:scale-[0.98]"
            >
              <LogIn size={16} /> Fazer Login no Painel
            </button>

            {/* Botão Secundário: Voltar de onde veio */}
            <button
              onClick={handleGoBack}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-gray-800 active:scale-[0.98]"
            >
              <ArrowLeft size={16} /> Voltar à página anterior
            </button>
          </div>

          {/* Rodapé */}
          <div className="mt-8 text-center text-[11px] font-semibold uppercase tracking-wider text-gray-400/80">
            Segurança • Diocese de União da Vitória
          </div>
        </div>
      </div>
    </div>
  );
}