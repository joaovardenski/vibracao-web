import { AlertCircle } from "lucide-react";

interface LoginErrorAlertProps {
  error: string | null;
}

export default function LoginErrorAlert({ error }: LoginErrorAlertProps) {
  if (!error) return null;

  return (
    <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-700 animate-in fade-in slide-in-from-top-1 duration-200">
      <AlertCircle size={18} className="shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold">Erro de autenticação</p>
        <p className="text-red-600/90 text-xs mt-0.5">{error}</p>
      </div>
    </div>
  );
}
