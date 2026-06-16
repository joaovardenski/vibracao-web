interface PaymentSummaryProps {
  details: {
    participant: {
      name: string;
      email: string;
    };
    ticket: {
      lot: string;
      ticket_number: string;
      amount: number;
    };
  };
  status: "approved" | "pending" | "failure";
}

export default function PaymentSummary({ details, status }: PaymentSummaryProps) {
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
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
          <span className="font-medium text-gray-700 text-right truncate max-w-45 sm:max-w-none">
            {details.participant.email}
          </span>
        </div>

        <div className="h-px w-full border-t border-dashed border-gray-200 my-1" />

        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-xs sm:text-sm">Lote</span>
          <span className="font-medium text-gray-800 bg-gray-200/60 px-2 py-0.5 rounded text-xs">
            {details.ticket.lot}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-xs sm:text-sm">Ingresso</span>
          <span className="font-mono font-medium text-gray-700 text-xs">
            {details.ticket.ticket_number}
          </span>
        </div>

        <div className="h-px w-full border-t border-dashed border-gray-200 my-1" />

        <div className="flex justify-between items-center pt-1">
          <span className="font-bold text-gray-900">{status === "approved" ? "Total pago" : "Valor da transação"}</span>
          <span className="text-lg font-black text-gray-900">
            {formatCurrency(details.ticket.amount)}
          </span>
        </div>
      </div>
    </div>
  );
}