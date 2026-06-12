import { useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  User,
  Eye,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  X,
  FileDown,
} from "lucide-react";
import AdminPainelBase from "../components/AdminPainelBase";
import { useRegistrations } from "../hooks/useRegistration";
import { useExportPdf } from "../hooks/useExportPdf";
import type { Registration } from "../types";

export default function Participants() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInscrito, setSelectedInscrito] = useState<Registration | null>(
    null,
  );

  const { registrations, loading, error, pagination } = useRegistrations(
    currentPage,
    search,
  );

  const { exportPdf, exporting, error: exportError } = useExportPdf();

  return (
    <AdminPainelBase>
      <div className="space-y-6 relative">
        {/* BLOCO DE FILTROS E BUSCA */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Input de Busca Unificada */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Buscar por nome, CPF ou e-mail..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-gray-200 bg-slate-50/50 pl-11 pr-4 py-3 text-sm font-medium outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center justify-end">
            <button
              onClick={exportPdf}
              disabled={exporting}
              className="p-2 border border-gray-200 rounded-xl hover:bg-slate-50 text-gray-500 transition flex items-center gap-1.5 text-xs font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileDown size={16} />
              <span className="hidden sm:inline">
                {exporting ? "Gerando PDF..." : "Exportar PDF"}
              </span>
            </button>
          </div>
          {exportError && (
            <p className="text-xs text-red-500 mt-2">{exportError}</p>
          )}
        </div>

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
          <div className="p-4 sm:p-6 border-t border-slate-50 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400">
              Mostrando{" "}
              <span className="font-bold text-gray-700">
                {registrations.length === 0
                  ? 0
                  : (pagination.current_page - 1) * 15 + 1}
                -{(pagination.current_page - 1) * 15 + registrations.length}
              </span>{" "}
              de{" "}
              <span className="font-bold text-gray-700">
                {pagination.total}
              </span>{" "}
              inscritos
            </span>

            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="p-2 border border-gray-200 rounded-xl hover:bg-slate-50 text-gray-500 disabled:opacity-40 disabled:hover:bg-white transition"
              >
                <ChevronLeft size={16} />
              </button>

              <span className="text-xs font-bold text-gray-700 px-3 py-2 bg-slate-50 rounded-xl border border-gray-100">
                Pág. {pagination.current_page} de {pagination.last_page}
              </span>

              <button
                disabled={currentPage === pagination.last_page}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="p-2 border border-gray-200 rounded-xl hover:bg-slate-50 text-gray-500 disabled:opacity-40 disabled:hover:bg-white transition"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* DRAWER / SIDE-SHEET: COMPONENTES DE DETALHES DO INSCRITO */}
        {selectedInscrito && (
          <>
            {/* Backdrop de fundo da gaveta */}
            <div
              className="fixed inset-0 z-50 bg-gray-900/30 backdrop-blur-xs"
              onClick={() => setSelectedInscrito(null)}
            />

            {/* Corpo da Gaveta Deslizante */}
            <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">
              <div>
                {/* Header do Drawer */}
                <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                      <User size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-800 leading-tight">
                        {selectedInscrito.participant.full_name}
                      </h3>
                      <p className="text-xs font-mono text-gray-400 mt-0.5">
                        {selectedInscrito.ticket_number}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedInscrito(null)}
                    className="p-1.5 text-gray-400 hover:bg-slate-50 hover:text-gray-600 rounded-lg transition"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Conteúdo da Ficha Cadastral */}
                <div className="space-y-5 overflow-y-auto max-h-[70vh] pr-1">
                  {/* Status do Ingresso */}
                  <div className="bg-slate-50 p-3 rounded-xl flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 uppercase">
                      Situação
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-full border bg-emerald-50 text-emerald-700 border-emerald-100">
                      Aprovado
                    </span>
                  </div>

                  {/* Informações Pessoais */}
                  <div className="space-y-3">
                    <h4 className="text-[11px] font-black uppercase tracking-wider text-indigo-600">
                      Dados Gerais
                    </h4>

                    <div className="flex gap-3 text-sm text-gray-600">
                      <CreditCard
                        size={16}
                        className="text-gray-400 shrink-0 mt-0.5"
                      />
                      <div>
                        <p className="text-xs text-gray-400">CPF</p>
                        <p className="font-semibold text-gray-800">
                          {selectedInscrito.participant.cpf}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 text-sm text-gray-600">
                      <Mail
                        size={16}
                        className="text-gray-400 shrink-0 mt-0.5"
                      />
                      <div>
                        <p className="text-xs text-gray-400">E-mail</p>
                        <p className="font-semibold text-gray-800 break-all">
                          {selectedInscrito.participant.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 text-sm text-gray-600">
                      <MapPin
                        size={16}
                        className="text-gray-400 shrink-0 mt-0.5"
                      />
                      <div>
                        <p className="text-xs text-gray-400">
                          Cidade / Paróquia
                        </p>
                        <p className="font-semibold text-gray-800">
                          {selectedInscrito.participant.city}
                        </p>
                        <p className="text-xs text-gray-500">
                          {selectedInscrito.participant.parish}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Segurança / Emergência */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <h4 className="text-[11px] font-black uppercase tracking-wider text-red-500">
                      Contatos de Segurança
                    </h4>
                    <div className="bg-red-50/40 border border-red-100/60 p-3 rounded-xl text-xs text-gray-700 leading-relaxed">
                      {selectedInscrito.participant.emergency_contact ||
                        "Nenhum contato cadastrado."}
                    </div>
                  </div>

                  {/* Informações da Inscrição */}
                  <div className="space-y-3 pt-3 border-t border-slate-100 text-xs text-gray-400 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> Inscrito em:{" "}
                      {selectedInscrito.created_at}
                    </span>
                    <span className="font-bold text-gray-700">
                      Valor Pago:{" "}
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(Number(selectedInscrito.amount))}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <a
                  href={`https://wa.me/55${selectedInscrito.participant.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-100 transition duration-200"
                >
                  <Phone size={16} />
                  Chamar no WhatsApp
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminPainelBase>
  );
}
