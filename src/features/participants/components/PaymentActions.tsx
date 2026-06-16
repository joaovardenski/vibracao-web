import { Link } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import type { PaymentStatus } from "../types/participantsTypes";

interface PaymentActionsProps {
  status: PaymentStatus;
  buttonClass: string;
  onRefresh: () => void;
}

export default function PaymentActions({ status, buttonClass, onRefresh }: PaymentActionsProps) {
  const isApproved = status === "approved";

  return (
    <div className="mt-8 space-y-2 sm:mt-8">
      {status === "pending" && (
        <button
          onClick={onRefresh}
          className={`w-full text-white rounded-xl py-3.5 font-bold text-sm shadow-sm transition flex items-center justify-center gap-2 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonClass}`}
        >
          <RefreshCw size={16} className="animate-spin-slow" />
          Atualizar status
        </button>
      )}

      <Link
        to="/"
        className="w-full flex bg-green-100 items-center justify-center gap-2 text-sm font-semibold text-gray-600 py-3.5 rounded-xl border border-transparent hover:bg-gray-50 active:bg-gray-100 transition"
      >
        {isApproved ? "Ir para o início" : "Voltar para o início"}
      </Link>
    </div>
  );
}