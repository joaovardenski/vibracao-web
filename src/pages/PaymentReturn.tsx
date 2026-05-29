import { usePaymentStatus } from "../hooks/usePaymentStatus";
import { Link } from "react-router-dom";
import type { PaymentStatus } from "../hooks/usePaymentStatus";
import {
  CheckCircle2,
  Clock3,
  XCircle,
  LoaderCircle,
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

const content = {
  approved: {
    title: "Inscrição Confirmada!",
    message:
      "Seu pagamento foi aprovado com sucesso. O comprovante foi enviado para o seu e-mail.",
    icon: CheckCircle2,
    iconClass: "text-emerald-500 bg-emerald-50",
    buttonClass: "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500",
    bgGradient: "from-emerald-50/40 via-white to-white",
  },
  pending: {
    title: "Pagamento em Análise",
    message:
      "Estamos aguardando a confirmação do banco. Isso pode levar alguns instantes.",
    icon: Clock3,
    iconClass: "text-amber-500 bg-amber-50 animate-pulse",
    buttonClass: "bg-amber-500 hover:bg-amber-600 focus:ring-amber-400",
    bgGradient: "from-amber-50/40 via-white to-white",
  },
  failure: {
    title: "Pagamento Recusado",
    message:
      "Houve um problema ao processar a transação. Verifique os dados ou tente outra forma.",
    icon: XCircle,
    iconClass: "text-rose-500 bg-rose-50",
    buttonClass: "bg-rose-600 hover:bg-rose-700 focus:ring-rose-500",
    bgGradient: "from-rose-50/40 via-white to-white",
  },
} satisfies Record<
  PaymentStatus,
  {
    title: string;
    message: string;
    icon: React.ElementType;
    iconClass: string;
    buttonClass: string;
    bgGradient: string;
  }
>;

export default function PaymentReturn() {
  const { status, details, loading, error, refresh } = usePaymentStatus();

  // Loading State Clean
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="relative flex items-center justify-center w-16 h-16 mx-auto mb-4">
            <LoaderCircle className="animate-spin text-blue-600" size={40} />
          </div>
          <p className="text-gray-600 font-medium">
            Verificando seu pagamento...
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Por favor, não feche esta página.
          </p>
        </div>
      </div>
    );
  }

  // Error State Clean
  if (error || !status) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={28} />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Erro na consulta</h1>
          <p className="mt-2 text-sm text-gray-600">
            Não conseguimos buscar o status atual do seu pagamento.
          </p>
          <div className="mt-6 space-y-2">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gray-900 text-white rounded-xl py-3.5 font-semibold text-sm transition active:scale-[0.98]"
            >
              Tentar novamente
            </button>
            <Link
              to="/"
              className="w-full flex items-center justify-center gap-2 text-sm font-medium text-gray-600 py-3 hover:text-gray-900"
            >
              <ArrowLeft size={16} /> Voltar para o início
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const {
    title,
    message,
    icon: Icon,
    iconClass,
    buttonClass,
    bgGradient,
  } = content[status];

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${bgGradient} flex items-center justify-center sm:py-12`}
    >
      <div className="w-full max-w-md bg-white sm:rounded-2xl sm:shadow-xl sm:border sm:border-gray-100 min-h-screen sm:min-h-auto flex flex-col justify-between p-6 sm:justify-center">
        {/* Top/Main Content */}
        <div className="my-auto sm:my-0">
          <div className="text-center mb-6">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${iconClass}`}
            >
              <Icon size={40} />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight px-2">
              {title}
            </h1>
            <p className="mt-2.5 text-sm text-gray-500 leading-relaxed max-w-sm mx-auto">
              {message}
            </p>
          </div>

          {/* Ticket/Invoice Details Style */}
          {details && status !== "failure" && (
            <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-5 relative overflow-hidden">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                Resumo da Inscrição
              </h2>

              <div className="space-y-3.5 text-sm">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-gray-500 text-xs sm:text-sm shrink-0">
                    Participante
                  </span>
                  <span className="font-semibold text-gray-900 text-right line-clamp-1">
                    {details.participant.name}
                  </span>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-500 text-xs sm:text-sm">
                    E-mail
                  </span>
                  <span className="font-medium text-gray-700 text-right truncate max-w-[180px] sm:max-w-none">
                    {details.participant.email}
                  </span>
                </div>

                <div className="h-[1px] w-full border-t border-dashed border-gray-200 my-1" />

                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-xs sm:text-sm">Lote</span>
                  <span className="font-medium text-gray-800 bg-gray-200/60 px-2 py-0.5 rounded text-xs">
                    {details.ticket.lot}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-xs sm:text-sm">
                    Ingresso
                  </span>
                  <span className="font-mono font-medium text-gray-700 text-xs">
                    {details.ticket.ticket_number}
                  </span>
                </div>

                <div className="h-[1px] w-full border-t border-dashed border-gray-200 my-1" />

                <div className="flex justify-between items-center pt-1">
                  <span className="font-bold text-gray-900">Total pago</span>
                  <span className="text-lg font-black text-gray-900">
                    {details.ticket.amount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons Group (Fixed at bottom on pure mobile viewport if needed, or normal flow) */}
        <div className="mt-8 space-y-2 sm:mt-8">
          {status === "pending" && (
            <button
              onClick={refresh}
              className={`w-full text-white rounded-xl py-3.5 font-bold text-sm shadow-sm transition flex items-center justify-center gap-2 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonClass}`}
            >
              <RefreshCw size={16} className="animate-spin-slow" />
              Atualizar status
            </button>
          )}

          {status === "failure" && (
            <Link
              to="/checkout" // Ou a rota anterior de pagamento
              className={`w-full block text-center text-white rounded-xl py-3.5 font-bold text-sm shadow-sm transition active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonClass}`}
            >
              Tentar outro método
            </Link>
          )}

          <Link
            to="/"
            className="w-full flex bg-green-100 items-center justify-center gap-2 text-sm font-semibold text-gray-600 py-3.5 rounded-xl border border-transparent hover:bg-gray-50 active:bg-gray-100 transition"
          >
            {status === "approved"
              ? "Ir para o início"
              : "Voltar para o início"}
          </Link>
        </div>
      </div>
    </div>
  );
}
