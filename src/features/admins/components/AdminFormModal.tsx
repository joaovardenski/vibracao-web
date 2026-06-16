import { useState } from "react";
import { X, User, Mail, Key, Loader2 } from "lucide-react";
import { isAxiosError } from "axios";
import api from "../../../services/api";
import type { AdminUser } from "../hooks/useAdmins";

interface AdminFormModalProps {
  isOpen: boolean;
  adminToEdit: AdminUser | null;
  onClose: () => void;
  onSuccess: () => void;
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message || fallback;
  }
  return fallback;
}

export default function AdminFormModal({ isOpen, adminToEdit, onClose, onSuccess }: AdminFormModalProps) {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [form, setForm] = useState({
    name: adminToEdit?.name ?? "",
    email: adminToEdit?.email ?? "",
    password: "",
  });

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSubmitLoading(true);
      if (adminToEdit) {
        await api.put(`/admin/admins/${adminToEdit.id}`, form);
      } else {
        await api.post("/admin/admins", form);
      }
      onSuccess();
      onClose();
    } catch (error: unknown) {
      const errorMsg = getErrorMessage(error, "Erro ao salvar dados.");
      alert(errorMsg);
    } finally {
      setSubmitLoading(false);
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs"
        onClick={() => !submitLoading && onClose()}
      />
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-250">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
              {adminToEdit ? "Alterar Administrador" : "Cadastrar Administrador"}
            </h3>
            <button
              onClick={onClose}
              disabled={submitLoading}
              className="p-1.5 text-gray-400 hover:bg-slate-50 rounded-lg cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase flex items-center gap-1">
                <User size={12} /> Nome
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs font-medium outline-none transition focus:border-indigo-500"
                placeholder="Nome completo do admin"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase flex items-center gap-1">
                <Mail size={12} /> E-mail
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs font-medium outline-none transition focus:border-indigo-500"
                placeholder="exemplo@email.com"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase flex items-center gap-1">
                <Key size={12} /> Senha
              </label>
              <input
                type="password"
                required={!adminToEdit}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs font-medium outline-none transition focus:border-indigo-500"
                placeholder={adminToEdit ? "Deixe em branco para não alterar" : "Mínimo 8 caracteres"}
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={submitLoading}
                className="flex-1 py-2.5 border border-gray-200 text-xs font-bold text-gray-500 rounded-xl hover:bg-slate-50 transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={submitLoading}
                className="flex-1 py-2.5 bg-indigo-600 text-xs font-bold text-white rounded-xl hover:bg-indigo-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {submitLoading ? <Loader2 size={14} className="animate-spin" /> : "Salvar Alterações"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}