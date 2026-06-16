import { Eye } from "lucide-react";
import type { Registration } from "../types/adminTypes";

interface ParticipantMobileListProps {
  registrations: Registration[];
  onSelect: (registration: Registration) => void;
}

export default function ParticipantMobileList({
  registrations,
  onSelect,
}: ParticipantMobileListProps) {
  return (
    <div className="block md:hidden divide-y divide-slate-100">
      {registrations.map((registration) => (
        <div
          key={registration.id}
          className="p-4 flex items-center justify-between gap-4"
        >
          <div className="min-w-0">
            <h5 className="text-sm font-bold text-gray-800 truncate">
              {registration.participant.full_name}
            </h5>
            <p className="text-xs text-gray-400 mt-0.5 font-mono">
              {registration.ticket_number}
            </p>
            <div className="mt-2">
              <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-full border bg-emerald-50 text-emerald-700 border-emerald-100">
                Aprovado
              </span>
            </div>
          </div>
          <button
            onClick={() => onSelect(registration)}
            className="p-3 bg-slate-50 text-gray-600 rounded-xl active:bg-slate-100 shrink-0 cursor-pointer"
          >
            <Eye size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}
