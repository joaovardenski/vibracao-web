import { useState, useEffect, useCallback } from "react";
import {
  Search,
  UserPlus,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Mail,
  User,
  Key,
  X,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { isAxiosError } from "axios";
import AdminPainelBase from "../../../layouts/AdminPainelBase";
import api from "../../../services/api";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

interface PaginationData {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}

// Extrai a mensagem de erro de forma segura, sem usar "any"
function getErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message || fallback;
  }
  return fallback;
}

export default function Admins() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Estados dos Modais
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null); // Se preenchido, é EDITAR. Se null, é CRIAR.
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Estado do Formulário
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Carregar Administradores do Backend
  const fetchAdmins = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/admins", {
        params: {
          page: currentPage,
          search: search || undefined,
          per_page: 10,
        },
      });
      if (response.data.success) {
        setAdmins(response.data.data.data);
        setPagination({
          current_page: response.data.data.current_page,
          last_page: response.data.data.last_page,
          total: response.data.data.total,
          per_page: response.data.data.per_page,
        });
      }
    } catch (error) {
      console.error("Erro ao carregar administradores", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, search]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAdmins();
  }, [fetchAdmins]);

  // Gatilho para abrir modal de Criação
  const handleOpenCreate = () => {
    setSelectedAdmin(null);
    setForm({ name: "", email: "", password: "" });
    setModalOpen(true);
  };

  // Gatilho para abrir modal de Edição
  const handleOpenEdit = (admin: AdminUser) => {
    setSelectedAdmin(admin);
    setForm({ name: admin.name, email: admin.email, password: "" }); // Senha vazia na edição
    setModalOpen(true);
  };

  // Enviar formulário (Store ou Update)
  const handleSaveAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitLoading(true);
      if (selectedAdmin) {
        // Rota de Update
        await api.put(`/admin/admins/${selectedAdmin.id}`, form);
      } else {
        // Rota de Store
        await api.post("/admin/admins", form);
      }
      setModalOpen(false);
      fetchAdmins();
    } catch (error: unknown) {
      const errorMsg = getErrorMessage(error, "Erro ao salvar dados.");
      alert(errorMsg);
    } finally {
      setSubmitLoading(false);
    }
  };

  // Executar a exclusão do administrador
  const handleDeleteAdmin = async () => {
    if (!deleteId) return;
    try {
      setDeleteLoading(true);
      await api.delete(`/admin/admins/${deleteId}`);
      setDeleteId(null);
      fetchAdmins();
    } catch (error: unknown) {
      // Captura a exceção tratada no backend (Ex: deletar si mesmo ou último admin)
      const errorMsg = getErrorMessage(
        error,
        "Não foi possível remover este administrador.",
      );
      alert(errorMsg);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <AdminPainelBase>
      <div className="space-y-6">
        {/* TOPO: TITULO, BUSCA E CRIAÇÃO */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xs">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Buscar administrador..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-gray-200 bg-slate-50/50 pl-11 pr-4 py-2.5 text-xs font-semibold outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 placeholder:text-gray-400"
            />
          </div>

          <button
            onClick={handleOpenCreate}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-xs font-bold text-white rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 shrink-0 cursor-pointer"
          >
            <UserPlus size={16} /> Adicionar Admin
          </button>
        </div>

        {/* TABELA / CARD LIST */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="animate-spin text-indigo-600" size={24} />
            </div>
          ) : admins.length === 0 ? (
            <div className="p-12 text-center text-xs text-gray-400 font-medium">
              Nenhum administrador encontrado.
            </div>
          ) : (
            <>
              {/* Desktop View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-slate-100">
                      <th className="py-4 px-6">Nome</th>
                      <th className="py-4 px-6">E-mail</th>
                      <th className="py-4 px-6 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-sm">
                    {admins.map((admin) => (
                      <tr
                        key={admin.id}
                        className="hover:bg-slate-50/40 transition"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-indigo-50 text-indigo-600 font-bold rounded-full flex items-center justify-center text-xs">
                              {admin.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-bold text-gray-800">
                              {admin.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-medium text-gray-500">
                          {admin.email}
                        </td>
                        <td className="py-4 px-6 text-right space-x-1">
                          <button
                            onClick={() => handleOpenEdit(admin)}
                            className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition cursor-pointer inline-flex"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => setDeleteId(admin.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition cursor-pointer inline-flex"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="block md:hidden divide-y divide-slate-100">
                {admins.map((admin) => (
                  <div
                    key={admin.id}
                    className="p-4 flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-800 truncate">
                        {admin.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate mt-0.5">
                        {admin.email}
                      </p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => handleOpenEdit(admin)}
                        className="p-2.5 bg-slate-50 text-slate-600 rounded-xl"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteId(admin.id)}
                        className="p-2.5 bg-red-50 text-red-600 rounded-xl"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* PAGINAÇÃO */}
          {pagination && pagination.last_page > 1 && (
            <div className="p-4 sm:p-5 border-t border-slate-50 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400">
                Total de {pagination.total} administradores
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="p-2 border border-gray-200 rounded-xl text-gray-500 disabled:opacity-40 transition"
                >
                  <ChevronLeft size={15} />
                </button>
                <span className="text-xs font-bold text-gray-700 px-3 py-1.5 bg-slate-50 rounded-lg">
                  {currentPage} / {pagination.last_page}
                </span>
                <button
                  disabled={currentPage === pagination.last_page}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="p-2 border border-gray-200 rounded-xl text-gray-500 disabled:opacity-40 transition"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* MODAL UNIFICADO: CRIAR OU EDITAR */}
        {modalOpen && (
          <>
            <div
              className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs"
              onClick={() => !submitLoading && setModalOpen(false)}
            />
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
              <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-250">
                <div className="flex items-center justify-between p-5 border-b border-slate-100">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                    {selectedAdmin
                      ? "Alterar Administrador"
                      : "Cadastrar Administrador"}
                  </h3>
                  <button
                    onClick={() => setModalOpen(false)}
                    disabled={submitLoading}
                    className="p-1.5 text-gray-400 hover:bg-slate-50 rounded-lg"
                  >
                    <X size={16} />
                  </button>
                </div>

                <form onSubmit={handleSaveAdmin} className="p-5 space-y-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-400 uppercase flex items-center gap-1">
                      <User size={12} /> Nome
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
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
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
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
                      required={!selectedAdmin} // Senha obrigatória apenas no cadastro
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs font-medium outline-none transition focus:border-indigo-500"
                      placeholder={
                        selectedAdmin
                          ? "Deixe em branco para não alterar"
                          : "Mínimo 6 caracteres"
                      }
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      disabled={submitLoading}
                      className="flex-1 py-2.5 border border-gray-200 text-xs font-bold text-gray-500 rounded-xl hover:bg-slate-50 transition"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={submitLoading}
                      className="flex-1 py-2.5 bg-indigo-600 text-xs font-bold text-white rounded-xl hover:bg-indigo-700 transition flex items-center justify-center gap-1.5"
                    >
                      {submitLoading ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        "Salvar Alterações"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}

        {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO DE CONTA */}
        {deleteId && (
          <>
            <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs" />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-xs rounded-2xl p-5 text-center space-y-4 animate-in zoom-in-95 duration-150">
                <div className="h-12 w-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-gray-800">
                    Excluir Administrador?
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Essa ação é irreversível e removerá o acesso dele
                    imediatamente.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={deleteLoading}
                    onClick={() => setDeleteId(null)}
                    className="flex-1 py-2 border border-gray-200 text-xs font-bold text-gray-500 rounded-xl hover:bg-slate-50 transition"
                  >
                    Voltar
                  </button>
                  <button
                    disabled={deleteLoading}
                    onClick={handleDeleteAdmin}
                    className="flex-1 py-2 bg-red-500 text-xs font-bold text-white rounded-xl hover:bg-red-600 transition flex items-center justify-center"
                  >
                    {deleteLoading ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      "Sim, Excluir"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminPainelBase>
  );
}
