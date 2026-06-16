import { useState } from "react";
import { Search, UserPlus, Edit2, Trash2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import AdminPainelBase from "../../../layouts/AdminPainelBase";
import { useAdmins, type AdminUser } from "../hooks/useAdmins";

import AdminFormModal from "../components/AdminFormModal";
import AdminDeleteModal from "../components/AdminDeleteModal";

export default function Admins() {
  const {
    admins,
    pagination,
    search,
    currentPage,
    loading,
    changeSearch,
    setCurrentPage,
    refetch,
  } = useAdmins();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);
  const [adminIdToDelete, setAdminIdToDelete] = useState<string | null>(null);

  const handleOpenCreate = () => {
    setSelectedAdmin(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (admin: AdminUser) => {
    setSelectedAdmin(admin);
    setIsFormModalOpen(true);
  };

  return (
    <AdminPainelBase>
      <div className="space-y-6">
        {/* TOPO: FILTROS E ADIÇÃO */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xs">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Buscar administrador..."
              value={search}
              onChange={(e) => changeSearch(e.target.value)}
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

        {/* LISTAGEM CENTRAL */}
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
                      <tr key={admin.id} className="hover:bg-slate-50/40 transition">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-indigo-50 text-indigo-600 font-bold rounded-full flex items-center justify-center text-xs">
                              {admin.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-bold text-gray-800">{admin.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-medium text-gray-500">{admin.email}</td>
                        <td className="py-4 px-6 text-right space-x-1">
                          <button
                            onClick={() => handleOpenEdit(admin)}
                            className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition cursor-pointer inline-flex"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => setAdminIdToDelete(admin.id)}
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
                  <div key={admin.id} className="p-4 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-800 truncate">{admin.name}</p>
                      <p className="text-xs text-gray-400 truncate mt-0.5">{admin.email}</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => handleOpenEdit(admin)}
                        className="p-2.5 bg-slate-50 text-slate-600 rounded-xl cursor-pointer"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => setAdminIdToDelete(admin.id)}
                        className="p-2.5 bg-red-50 text-red-600 rounded-xl cursor-pointer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* PAGINAÇÃO DE ACORDO COM O ESTADO DO HOOK */}
          {pagination && pagination.last_page > 1 && (
            <div className="p-4 sm:p-5 border-t border-slate-50 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400">
                Total de {pagination.total} administradores
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="p-2 border border-gray-200 rounded-xl text-gray-500 disabled:opacity-40 transition cursor-pointer"
                >
                  <ChevronLeft size={15} />
                </button>
                <span className="text-xs font-bold text-gray-700 px-3 py-1.5 bg-slate-50 rounded-lg">
                  {currentPage} / {pagination.last_page}
                </span>
                <button
                  disabled={currentPage === pagination.last_page}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="p-2 border border-gray-200 rounded-xl text-gray-500 disabled:opacity-40 transition cursor-pointer"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* MODAL FORMULÁRIO (CRIAR / EDITAR) */}
        <AdminFormModal
          key={selectedAdmin?.id ?? "new"}
          isOpen={isFormModalOpen}
          adminToEdit={selectedAdmin}
          onClose={() => setIsFormModalOpen(false)}
          onSuccess={refetch}
        />

        {/* MODAL DE DELETAR */}
        <AdminDeleteModal
          adminId={adminIdToDelete}
          onClose={() => setAdminIdToDelete(null)}
          onSuccess={refetch}
        />
      </div>
    </AdminPainelBase>
  );
}