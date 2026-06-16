import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export default function PaymentError() {
  const handleReload = () => {
    window.location.reload();
  };

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
            onClick={handleReload}
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