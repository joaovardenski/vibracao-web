import { Link } from "react-router-dom";
import { UserPlus, ArrowRight } from "lucide-react";
import { DASHBOARD_STATUS_STYLES } from "../constants/dashboardStatus";
import { formatCurrency } from "../../../shared/utils/format";

interface Registration {
  id: string;
  ticket_number: string;
  amount: number;
  status: keyof typeof DASHBOARD_STATUS_STYLES;
  participant: {
    full_name: string;
    city: string;
  };
  ticket_lot: {
    name: string;
  };
}

interface LatestRegistrationsProps {
  registrations: Registration[];
}

export default function DashboardLatestRegistrations({ registrations }: LatestRegistrationsProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserPlus size={18} className="text-gray-400" />
          <h4 className="text-sm font-bold text-slate-800">Últimas Inscrições</h4>
        </div>
        <Link to="/admin/participantes" className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1">
          Ver todos <ArrowRight size={14} />
        </Link>
      </div>

      {/* Versão Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-slate-100">
              <th className="py-4 px-6">Inscrito / Cidade</th>
              <th className="py-4 px-6">Nº Bilhete</th>
              <th className="py-4 px-6">Lote</th>
              <th className="py-4 px-6">Valor</th>
              <th className="py-4 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {registrations.map((reg) => {
              const statusStyle = DASHBOARD_STATUS_STYLES[reg.status];
              return (
                <tr key={reg.id} className="hover:bg-slate-50/50 transition">
                  <td className="py-4 px-6">
                    <p className="font-bold text-gray-800">{reg.participant.full_name}</p>
                    <p className="text-xs text-gray-400">{reg.participant.city}</p>
                  </td>
                  <td className="py-4 px-6 font-mono text-xs font-semibold text-gray-500">{reg.ticket_number}</td>
                  <td className="py-4 px-6 text-gray-600 font-medium">{reg.ticket_lot.name}</td>
                  <td className="py-4 px-6 font-bold text-gray-700">{formatCurrency(reg.amount)}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full border ${statusStyle.bg}`}>
                      {statusStyle.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Versão Mobile */}
      <div className="block md:hidden divide-y divide-slate-100">
        {registrations.map((reg) => {
          const statusStyle = DASHBOARD_STATUS_STYLES[reg.status];
          return (
            <div key={reg.id} className="p-4 space-y-3 hover:bg-slate-50/40 transition">
              <div className="flex items-start justify-between">
                <div>
                  <h5 className="text-sm font-bold text-gray-800">{reg.participant.full_name}</h5>
                  <p className="text-xs text-gray-400">{reg.participant.city}</p>
                </div>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-bold rounded-full border ${statusStyle.bg}`}>
                  {statusStyle.label}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl">
                <div>
                  <p className="text-gray-400 font-medium">Bilhete: <span className="font-mono font-bold text-gray-600">{reg.ticket_number}</span></p>
                  <p className="text-gray-400 font-medium mt-0.5">Lote: <span className="text-gray-600 font-semibold">{reg.ticket_lot.name}</span></p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 font-medium">Valor</p>
                  <p className="font-black text-gray-800 text-sm">{formatCurrency(reg.amount)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}