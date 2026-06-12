import { ChevronLeft, ChevronRight } from "lucide-react";

interface ParticipantPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsShown: number;

  onPrevious: () => void;
  onNext: () => void;
}

export default function ParticipantPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsShown,
  onPrevious,
  onNext,
}: ParticipantPaginationProps) {
  const start = itemsShown === 0 ? 0 : (currentPage - 1) * 15 + 1;

  const end = (currentPage - 1) * 15 + itemsShown;

  return (
    <div className="p-4 sm:p-6 border-t border-slate-50 flex items-center justify-between">
      <span className="text-xs font-medium text-gray-400">
        Mostrando{" "}
        <span className="font-bold text-gray-700">
          {start}-{end}
        </span>{" "}
        de <span className="font-bold text-gray-700">{totalItems}</span>{" "}
        inscritos
      </span>

      <div className="flex items-center gap-1.5">
        <button
          disabled={currentPage === 1}
          onClick={onPrevious}
          className="p-2 border border-gray-200 rounded-xl hover:bg-slate-50 text-gray-500 disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </button>

        <span className="text-xs font-bold text-gray-700 px-3 py-2 bg-slate-50 rounded-xl border border-gray-100">
          Pág. {currentPage} de {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={onNext}
          className="p-2 border border-gray-200 rounded-xl hover:bg-slate-50 text-gray-500 disabled:opacity-40"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
