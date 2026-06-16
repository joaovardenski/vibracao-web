import { MapPin, Church, HeartHandshake, ArrowLeft } from "lucide-react";
import FormField from "../../../shared/components/FormField";
import LoadingSpinner from "../../../shared/components/LoadingSpiner";
import type {RegisterForm, FormErrors} from "../types/participantsTypes";

interface RegisterStepTwoProps {
  form: RegisterForm;
  errors: FormErrors;
  updateField: (
    field: keyof RegisterForm,
    value: string
  ) => void;
  loading: boolean;
  onPrevStep: () => void;
}

export default function RegisterStepTwo({
  form,
  errors,
  updateField,
  loading,
  onPrevStep,
}: RegisterStepTwoProps) {
  return (
    <div className="flex flex-col gap-5 animate-fadeIn">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
          Passo 2 de 2: De onde você vem?
        </span>
        <button
          type="button"
          onClick={onPrevStep}
          className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-indigo-600 transition"
        >
          <ArrowLeft size={14} /> Voltar ao passo 1
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          id="city"
          label={
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-indigo-500" /> Cidade
            </span>
          }
          value={form.city}
          error={errors.city}
          placeholder="Ex: União da Vitória"
          onChange={(value) => updateField("city", value)}
        />

        <FormField
          id="parish"
          label={
            <span className="flex items-center gap-2">
              <Church size={16} className="text-indigo-500" /> Paróquia / Comunidade
            </span>
          }
          value={form.parish}
          error={errors.parish}
          placeholder="Ex: Nossa Senhora de Fátima"
          onChange={(value) => updateField("parish", value)}
        />
      </div>

      <FormField
        id="emergency_contact"
        label={
          <span className="flex items-center gap-2">
            <HeartHandshake size={16} className="text-indigo-500" /> Contato de emergência (Opcional)
          </span>
        }
        value={form.emergency_contact ?? ""}
        error={errors.emergency_contact}
        placeholder="Nome do responsável e telefone"
        onChange={(value) => updateField("emergency_contact", value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-4 text-base font-black text-white shadow-xl shadow-indigo-200 transition-all duration-150 hover:from-indigo-700 hover:to-purple-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <LoadingSpinner />
            <span>Processando Vaga...</span>
          </>
        ) : (
          <>Confirmar e Ir para o Pagamento ⚡</>
        )}
      </button>
    </div>
  );
}