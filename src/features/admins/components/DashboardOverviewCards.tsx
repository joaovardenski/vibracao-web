import { DollarSign, Ticket, Clock3, XCircle } from "lucide-react";
import { formatCurrency } from "../../../shared/utils/format";

interface OverviewCardsProps {
  stats: {
    total_revenue: number;
    remaining_spots: number;
    pending: number;
    cancelled: number;
  };
  totalSpots: number;
  filledSpots: number;
}

export default function DashboardOverviewCards({
  stats,
  totalSpots,
  filledSpots,
}: OverviewCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {/* Card: Receita Realizada */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Arrecadação Total
          </p>
          <h3 className="text-2xl font-black text-slate-800 mt-1">
            {formatCurrency(stats.total_revenue)}
          </h3>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            Apenas pedidos aprovados
          </p>
        </div>
        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
          <DollarSign size={24} />
        </div>
      </div>

      {/* Card: Vagas Disponíveis */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Vagas Restantes
          </p>
          <h3 className="text-2xl font-black text-slate-800 mt-1">
            {stats.remaining_spots}{" "}
            <span className="text-sm font-normal text-gray-400">
              / {totalSpots}
            </span>
          </h3>
          <p className="text-[11px] text-indigo-600 font-semibold mt-1">
            {filledSpots} inscrições confirmadas
          </p>
        </div>
        <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
          <Ticket size={24} />
        </div>
      </div>

      {/* Card Rápido de Status Acumulado */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs grid grid-cols-2 gap-4 sm:col-span-2 lg:col-span-1">
        <div className="bg-slate-50/60 p-3 rounded-xl flex items-center gap-2.5">
          <Clock3 size={18} className="text-amber-500 shrink-0" />
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase">
              Pendentes
            </p>
            <p className="text-lg font-black text-slate-800">{stats.pending}</p>
          </div>
        </div>
        <div className="bg-slate-50/60 p-3 rounded-xl flex items-center gap-2.5">
          <XCircle size={18} className="text-red-500 shrink-0" />
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase">
              Cancelados
            </p>
            <p className="text-lg font-black text-slate-800">
              {stats.cancelled}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
