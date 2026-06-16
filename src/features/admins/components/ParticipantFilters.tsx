import { Search, FileDown, Plus } from "lucide-react";

interface ParticipantsFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  onExport: () => void;
  exporting: boolean;
  exportError?: string | null;
  onCreateClick: () => void;
}

export default function ParticipantsFilters({
  search,
  onSearchChange,
  onExport,
  exporting,
  exportError,
  onCreateClick,
}: ParticipantsFiltersProps) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="relative flex-1 max-w-md">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Search size={18} />
        </span>

        <input
          type="text"
          placeholder="Buscar por nome, CPF ou e-mail..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-slate-50/50 pl-11 pr-4 py-3 text-sm font-medium outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onCreateClick}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition text-xs font-bold cursor-pointer"
        >
          <Plus size={16} />
          Novo Participante
        </button>

        <button
          onClick={onExport}
          disabled={exporting}
          className="p-2 border border-gray-200 rounded-xl hover:bg-slate-50 text-gray-500 transition flex items-center gap-1.5 text-xs font-bold disabled:opacity-50"
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
  );
}
