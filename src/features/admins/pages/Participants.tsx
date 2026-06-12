import { useState } from "react";
import { Eye } from "lucide-react";
import AdminPainelBase from "../../../layouts/AdminPainelBase";
import { useRegistrations } from "../hooks/useRegistrations";
import { useExportPdf } from "../hooks/useExportPdf";
import type { Registration } from "../types/adminTypes";
import ParticipantDrawer from "../components/ParticipantDrawer";
import ParticipantsFilters from "../components/ParticipantFilters";
import ParticipantPagination from "../components/ParticipantPagination";
import CreateParticipantModal from "../components/CreateParticipantModal";

export default function Participants() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInscrito, setSelectedInscrito] = useState<Registration | null>(
    null,
  );
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { registrations, loading, error, pagination } = useRegistrations(
    currentPage,
    search,
  );

  const { exportPdf, exporting, error: exportError } = useExportPdf();

  return (
    <AdminPainelBase>
      <div className="space-y-6 relative">
        {/* BLOCO DE FILTROS E BUSCA */}
        <ParticipantsFilters
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
          onExport={exportPdf}
          exporting={exporting}
          exportError={exportError}
          onCreateParticipant={() => setShowCreateModal(true)}
        />

        {/* LISTAGEM PRINCIPAL */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          {/* Estado de carregamento */}
          {loading && (
            <div className="p-10 text-center text-sm text-gray-400">
              Carregando inscritos...
            </div>
          )}

          {/* Estado de erro */}
          {!loading && error && (
            <div className="p-10 text-center text-sm text-red-500">{error}</div>
          )}

          {/* Estado vazio */}
          {!loading && !error && registrations.length === 0 && (
            <div className="p-10 text-center text-sm text-gray-400">
              Nenhum inscrito encontrado.
            </div>
          )}

          {/* Tabela Desktop */}
          {!loading && !error && registrations.length > 0 && (
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-slate-100">
                    <th className="py-4 px-6">Inscrito</th>
                    <th className="py-4 px-6">Documento/Contato</th>
                    <th className="py-4 px-6">Identificador</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm">
                  {registrations.map((inscrito) => (
                    <tr
                      key={inscrito.id}
                      className="hover:bg-slate-50/50 transition"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center font-bold">
                            {inscrito.participant.full_name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">
                              {inscrito.participant.full_name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {inscrito.participant.city}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-xs font-semibold text-gray-700">
                          {inscrito.participant.cpf}
                        </p>
                        <p className="text-xs text-gray-400">
                          {inscrito.participant.email}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-mono text-xs font-bold text-gray-500">
                          {inscrito.ticket_number}
                        </p>
                        <p className="text-[11px] text-indigo-500 font-medium">
                          {inscrito.ticket_lot.name}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full border bg-emerald-50 text-emerald-700 border-emerald-100">
                          Aprovado
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => setSelectedInscrito(inscrito)}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition cursor-pointer"
                          title="Ver Detalhes"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Versão Mobile Cards */}
          {!loading && !error && registrations.length > 0 && (
            <div className="block md:hidden divide-y divide-slate-100">
              {registrations.map((inscrito) => (
                <div
                  key={inscrito.id}
                  className="p-4 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <h5 className="text-sm font-bold text-gray-800 truncate">
                      {inscrito.participant.full_name}
                    </h5>
                    <p className="text-xs text-gray-400 mt-0.5 font-mono">
                      {inscrito.ticket_number}
                    </p>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-full border bg-emerald-50 text-emerald-700 border-emerald-100">
                        Aprovado
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedInscrito(inscrito)}
                    className="p-3 bg-slate-50 text-gray-600 rounded-xl active:bg-slate-100 shrink-0"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* COMPONENTE DE PAGINAÇÃO */}
          <ParticipantPagination
            currentPage={pagination.current_page}
            totalPages={pagination.last_page}
            totalItems={pagination.total}
            itemsShown={registrations.length}
            onPrevious={() => setCurrentPage((prev) => prev - 1)}
            onNext={() => setCurrentPage((prev) => prev + 1)}
          />
        </div>

        {/* DRAWER / SIDE-SHEET: COMPONENTES DE DETALHES DO INSCRITO */}
        <ParticipantDrawer
          participant={selectedInscrito}
          onClose={() => setSelectedInscrito(null)}
        />

        <CreateParticipantModal
          open={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      </div>
    </AdminPainelBase>
  );
}
