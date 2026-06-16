import { Lock, QrCode } from "lucide-react";

export default function RegisterFooter() {
  return (
    <div className="mt-2 flex items-center justify-center gap-4 text-center text-xs text-gray-400">
      <span className="flex items-center gap-1">
        <Lock size={12} className="text-emerald-500" /> Conexão Segura
      </span>
      <span>•</span>
      <span className="flex items-center gap-1">
        <QrCode size={12} className="text-indigo-400" /> Pix
      </span>
    </div>
  );
}
