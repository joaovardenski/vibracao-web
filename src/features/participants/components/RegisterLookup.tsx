import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { maskCpf } from "../../../shared/masks/sharedMasks";
import FormField from "../../../shared/components/FormField";
import api from "../../../services/api";
import { AxiosError } from "axios";

interface RegistrationData {
  full_name: string;
  created_at: string;
  status: string;
}

interface RegisterLookupProps {
  onBack: () => void;
  onSuccess: (data: RegistrationData) => void;
}

export default function RegisterLookup({
  onBack,
  onSuccess,
}: RegisterLookupProps) {
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isFormInvalid =
    cpf.replace(/\D/g, "").length !== 11 || !email.includes("@");

  async function handleLookup(e: React.SubmitEvent) {
    e.preventDefault();
    setError("");
    const cleanCpf = cpf.replace(/\D/g, "");

    try {
      setLoading(true);
      const response = await api.get(`/registrations/status/${cleanCpf}`, {
        params: { email: email.trim() },
      });
      onSuccess(response.data);
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;

      setError(
        error.response?.data?.message ||
          "Dados incorretos ou nenhuma inscrição aprovada encontrada.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-5 animate-fadeIn">
      <div className="flex items-center gap-3 border-b border-gray-100 pb-3 mb-1">
        <button
          type="button"
          onClick={onBack}
          className="p-2 text-gray-400 hover:bg-slate-50 hover:text-gray-600 rounded-xl transition cursor-pointer"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h3 className="text-base font-black text-slate-800">
            Consultar Inscrição
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Confirme os seus dados para verificar o estado.
          </p>
        </div>
      </div>

      <form onSubmit={handleLookup} className="space-y-4">
        <FormField
          id="lookup_cpf"
          inputMode="numeric"
          label="CPF do Participante"
          value={cpf}
          placeholder="000.000.000-00"
          onChange={(value) => setCpf(maskCpf(value))}
        />

        <FormField
          id="lookup_email"
          type="email"
          label="E-mail Cadastrado"
          value={email}
          placeholder="exemplo@email.com"
          onChange={setEmail}
        />

        {error && (
          <span className="mt-1 flex items-center gap-1 px-0.5 text-xs font-medium text-red-500 animate-shake">
            ⚠️ {error}
          </span>
        )}

        <button
          type="submit"
          disabled={loading || isFormInvalid}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-indigo-100 transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? "A verificar..." : "Verificar Inscrição"}
        </button>
      </form>
    </div>
  );
}
