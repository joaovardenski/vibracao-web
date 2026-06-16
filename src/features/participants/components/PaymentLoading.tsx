import { LoaderCircle } from "lucide-react";

export default function PaymentLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="relative flex items-center justify-center w-16 h-16 mx-auto mb-4">
          <LoaderCircle className="animate-spin text-blue-600" size={40} />
        </div>
        <p className="text-gray-600 font-medium">Verificando seu pagamento...</p>
        <p className="text-gray-400 text-xs mt-1">Por favor, não feche esta página.</p>
      </div>
    </div>
  );
}