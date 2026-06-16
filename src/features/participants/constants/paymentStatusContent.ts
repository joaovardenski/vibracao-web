import React from "react";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import type { PaymentStatus } from "../types/participantsTypes";

export const paymentStatusContent = {
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
      "Estamos aguardando a confirmação do banco. Isso pode levar alguns instantes. Caso não tenha feito o pagamento, tente novamente.",
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
