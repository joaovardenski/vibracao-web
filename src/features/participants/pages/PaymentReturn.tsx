import { usePaymentStatus } from "../hooks/usePaymentStatus";
import { paymentStatusContent } from "../constants/paymentStatusContent";
import PaymentLoading from "../components/PaymentLoading";
import PaymentError from "../components/PaymentError";
import PaymentSummary from "../components/PaymentSummary";
import PaymentActions from "../components/PaymentActions";

export default function PaymentReturn() {
  const { status, details, loading, error, refresh } = usePaymentStatus();

  if (loading) {
    return <PaymentLoading />;
  }

  if (error || !status) {
    return <PaymentError />;
  }

  const {
    title,
    message,
    icon: StatusIcon,
    iconClass,
    buttonClass,
    bgGradient,
  } = paymentStatusContent[status];

  const showSummary = details && status !== "failure";

  return (
    <div className={`min-h-screen bg-linear-to-b ${bgGradient} flex items-center justify-center sm:py-12`}>
      <div className="w-full max-w-md bg-white sm:rounded-2xl sm:shadow-xl sm:border sm:border-gray-100 min-h-screen sm:min-h-auto flex flex-col justify-between p-6 sm:justify-center">
        
        {/* Conteúdo Principal */}
        <div className="my-auto sm:my-0">
          <div className="text-center mb-6">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${iconClass}`}>
              <StatusIcon size={40} />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight px-2">
              {title}
            </h1>
            <p className="mt-2.5 text-sm text-gray-500 leading-relaxed max-w-sm mx-auto">
              {message}
            </p>
          </div>

          {showSummary && <PaymentSummary details={details} />}
        </div>

        {/* Grupo de Botões de Ação */}
        <PaymentActions 
          status={status} 
          buttonClass={buttonClass} 
          onRefresh={refresh} 
        />
        
      </div>
    </div>
  );
}