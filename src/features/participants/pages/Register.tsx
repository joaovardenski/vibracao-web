import { useState } from "react";
import { useRegisterForm } from "../hooks/useRegisterForm";
import RegisterHeader from "../components/RegisterHeader";
import RegisterStepOne from "../components/RegisterStepOne";
import RegisterStepTwo from "../components/RegisterStepTwo";
import RegisterFooter from "../components/RegisterFooter";
import RegisterLookup from "../components/RegisterLookup";
import RegisterResult from "../components/RegisterResult";

type RegisterStep = "step1" | "step2" | "lookup" | "result";

interface RegistrationStatusData {
  full_name: string;
  created_at: string;
  status: string;
}

export default function Register() {
  const { form, errors, loading, serverError, updateField, handleSubmit } =
    useRegisterForm();
  const [step, setStep] = useState<RegisterStep>("step1");
  const [registrationData, setRegistrationData] =
    useState<RegistrationStatusData | null>(null);

  // Validações simplificadas do Passo 1
  const isCpfValid = form.cpf.replace(/\D/g, "").length === 11;
  const isPhoneValid = form.phone.replace(/\D/g, "").length >= 10;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const isNameValid = form.full_name.trim().length >= 5;
  const canGoToStep2 =
    isNameValid && isCpfValid && isEmailValid && isPhoneValid;

  const showHeader = step === "step1" || step === "step2";

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-purple-100/80 bg-white/90 backdrop-blur-md shadow-2xl transition-all duration-300">
        {showHeader && (
          <RegisterHeader currentStep={step === "step1" ? 1 : 2} />
        )}

        <div className="p-6 sm:p-8">
          {serverError && showHeader && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-700 animate-shake">
              <span className="text-lg">⚠️</span>
              <p className="font-semibold">{serverError}</p>
            </div>
          )}

          {step === "step1" && (
            <div className="flex flex-col gap-5">
              <RegisterStepOne
                form={form}
                errors={errors}
                updateField={updateField}
                canAdvance={canGoToStep2}
                onNextStep={() => setStep("step2")}
              />
              <button
                type="button"
                onClick={() => setStep("lookup")}
                className="text-xs text-center font-bold text-indigo-500 hover:text-indigo-600 transition underline cursor-pointer mt-2"
              >
                Já se inscreveu? Verifique o status da sua inscrição aqui
              </button>
            </div>
          )}

          {step === "step2" && (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
              noValidate
            >
              <RegisterStepTwo
                form={form}
                errors={errors}
                updateField={updateField}
                loading={loading}
                onPrevStep={() => setStep("step1")}
              />
              <RegisterFooter />
            </form>
          )}

          {step === "lookup" && (
            <RegisterLookup
              onBack={() => setStep("step1")}
              onSuccess={(data) => {
                setRegistrationData(data);
                setStep("result");
              }}
            />
          )}

          {step === "result" && registrationData && (
            <RegisterResult
              data={registrationData}
              onReset={() => {
                setRegistrationData(null);
                setStep("step1");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
