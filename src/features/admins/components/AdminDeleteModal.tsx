import { useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { isAxiosError } from "axios";
import api from "../../../services/api";

interface AdminDeleteModalProps {
  adminId: string | null;
  onClose: () => void;
  onSuccess: () => void;
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message || fallback;
  }
  return fallback;
}

export default function AdminDeleteModal({ adminId, onClose, onSuccess }: AdminDeleteModalProps) {
  const [deleteLoading, setDeleteLoading] = useState(false);

  if (!adminId) return null;

  async function handleDelete() {
    try {
      setDeleteLoading(true);
      await api.delete(`/admin/admins/${adminId}`);
      onSuccess();
      onClose();
    } catch (error: unknown) {
      const errorMsg = getErrorMessage(error, "Não foi possível remover este administrador.");
      alert(errorMsg);
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-xs rounded-2xl p-5 text-center space-y-4 animate-in zoom-in-95 duration-150">
          <div className="h-12 w-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h4 className="text-sm font-black text-gray-800">Excluir Administrador?</h4>
            <p className="text-xs text-gray-400 mt-1">
              Essa ação é irreversível e removerá o acesso dele imediatamente.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              disabled={deleteLoading}
              onClick={onClose}
              className="flex-1 py-2 border border-gray-200 text-xs font-bold text-gray-500 rounded-xl hover:bg-slate-50 transition cursor-pointer"
            >
              Voltar
            </button>
            <button
              disabled={deleteLoading}
              onClick={handleDelete}
              className="flex-1 py-2 bg-red-500 text-xs font-bold text-white rounded-xl hover:bg-red-600 transition flex items-center justify-center cursor-pointer"
            >
              {deleteLoading ? <Loader2 size={14} className="animate-spin" /> : "Sim, Excluir"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}