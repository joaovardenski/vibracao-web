import { Eye } from "lucide-react";
import type { Registration } from "../types/adminTypes";

interface ParticipantTableProps {
  registrations: Registration[];
  onSelect: (registration: Registration) => void;
}

export default function ParticipantTable({ registrations, onSelect }: ParticipantTableProps) {
  return (
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
          {registrations.map((registration) => (
            <tr
              key={registration.id}
              className="hover:bg-slate-50/50 transition"
            >
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center font-bold">
                    {registration.participant.full_name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">
                      {registration.participant.full_name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {registration.participant.city}
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6">
                <p className="text-xs font-semibold text-gray-700">
                  {registration.participant.cpf}
                </p>
                <p className="text-xs text-gray-400">
                  {registration.participant.email}
                </p>
              </td>
              <td className="py-4 px-6">
                <p className="font-mono text-xs font-bold text-gray-500">
                  {registration.ticket_number}
                </p>
                <p className="text-[11px] text-indigo-500 font-medium">
                  {registration.ticket_lot.name}
                </p>
              </td>
              <td className="py-4 px-6">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full border bg-emerald-50 text-emerald-700 border-emerald-100">
                  Aprovado
                </span>
              </td>
              <td className="py-4 px-6 text-right">
                <button
                  onClick={() => onSelect(registration)}
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
  );
}