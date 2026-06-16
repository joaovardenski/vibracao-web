import { useState } from "react";
import { useRegisterForm } from "../hooks/useRegisterForm";
import RegisterHeader from "../components/RegisterHeader";
import RegisterStepOne from "../components/RegisterStepOne";
import RegisterStepTwo from "../components/RegisterStepTwo";
import RegisterFooter from "../components/RegisterFooter";

export default function Register() {
  const { form, errors, loading, serverError, updateField, handleSubmit } = useRegisterForm();
  const [step, setStep] = useState<1 | 2>(1);

  const isCpfValid = form.cpf.replace(/\D/g, "").length === 11;
  const isPhoneValid = form.phone.replace(/\D/g, "").length >= 10;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const isNameValid = form.full_name.trim().length >= 5;
  
  const canGoToStep2 = isNameValid && isCpfValid && isEmailValid && isPhoneValid;

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Container Principal */}
      <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-purple-100/80 bg-white/90 backdrop-blur-md shadow-2xl transition-all duration-300">
        
        <RegisterHeader currentStep={step} />

        {/* Corpo do Formulário */}
        <div className="p-6 sm:p-8">
          {serverError && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-700 animate-shake">
              <span className="text-lg">⚠️</span>
              <p className="font-semibold">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            {step === 1 ? (
              <RegisterStepOne
                form={form}
                errors={errors}
                updateField={updateField}
                canAdvance={canGoToStep2}
                onNextStep={() => setStep(2)}
              />
            ) : (
              <RegisterStepTwo
                form={form}
                errors={errors}
                updateField={updateField}
                loading={loading}
                onPrevStep={() => setStep(1)}
              />
            )}

            <RegisterFooter />
          </form>
        </div>
      </div>
    </div>
  );
}