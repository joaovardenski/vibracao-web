import { CheckCircle2, Calendar, ShieldCheck, User } from "lucide-react";

interface RegistrationData {
  full_name: string;
  created_at: string;
  status: string;
}

interface RegisterResultProps {
  data: RegistrationData;
  onReset: () => void;
}

export default function RegisterResult({ data, onReset }: RegisterResultProps) {
  const formattedDate = new Date(data.created_at).toLocaleDateString("pt-BR");

  return (
    <div className="flex flex-col gap-6 text-center py-2 animate-fadeIn">
      {/* Ícone de Sucesso Animado ou Destacado */}
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 shadow-inner">
        <CheckCircle2 size={44} className="stroke-[2.5]" />
      </div>

      {/* Título Principal */}
      <div className="px-2">
        <h3 className="text-xl font-black tracking-tight text-slate-800 sm:text-2xl">
          Inscrição Confirmada!
        </h3>
        <p className="text-sm text-gray-500 mt-1.5 max-w-xs mx-auto">
          Sua vaga está garantida. Apresente seus dados na entrada do evento.
        </p>
      </div>

      {/* "Ticket" da Inscrição Adaptado para Mobile */}
      <div className="rounded-2xl border border-slate-200 bg-linear-to-b from-slate-50/70 to-slate-50/30 text-left shadow-xs">
        
        {/* Seção Superior do Ticket: Participante */}
        <div className="p-5 flex items-start gap-3">
          <div className="p-2 bg-white rounded-xl border border-slate-100 text-slate-400 mt-0.5">
            <User size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
              Participante
            </span>
            <p className="text-base font-bold text-slate-700 mt-0.5 truncate">
              {data.full_name}
            </p>
          </div>
        </div>

        {/* Linha Divisória Estilo Ticket de Evento */}
        <div className="border-t border-dashed border-slate-200 relative mx-5" />

        {/* Seção Inferior: Grid que empilha no celular e divide no Desktop */}
        <div className="p-5 grid grid-cols-1 gap-4 xs:grid-cols-2 border-slate-200/60">
          {/* Data */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Data do Registro
            </span>
            <div className="text-sm font-semibold text-slate-600 flex items-center gap-2 mt-0.5">
              <Calendar size={15} className="text-indigo-500 shrink-0" />
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1 xs:items-end xs:text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Situação do Ingresso
            </span>
            <div className="mt-0.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                <ShieldCheck size={14} className="text-emerald-500" />
                Ativo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Botão de Ação Principal Otimizado para o Polegar */}
      <div className="mt-2 px-1">
        <button
          type="button"
          onClick={onReset}
          className="w-full py-4 px-6 border border-gray-200 text-sm font-bold text-gray-600 rounded-xl bg-white hover:bg-slate-50 transition-all duration-150 active:scale-[0.99] active:bg-gray-100 shadow-xs cursor-pointer select-none touch-manipulation"
        >
          Voltar ao Início
        </button>
      </div>
    </div>
  );
}