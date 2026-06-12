import {
  Clock3,
  XCircle,
  DollarSign,
  Ticket,
  UserPlus,
  ArrowRight,
} from "lucide-react";
import AdminPainelBase from "../components/AdminPainelBase";
import { useDashboard } from "../hooks/useDashboard";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { stats, loading, error, refetch } = useDashboard();
  // Simulando o estado inicial dos dados (substitua pelo seu fetch/axios real)

  if (loading || !stats) {
    return (
      <AdminPainelBase>
        <div className="flex h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
        </div>
      </AdminPainelBase>
    );
  }

  if (error) {
    return (
      <AdminPainelBase>
        <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
          <div className="p-4 bg-red-50 rounded-2xl text-red-500">
            <XCircle size={32} />
          </div>
          <div className="text-center">
            <h3 className="text-sm font-bold text-slate-800">
              Erro ao carregar dados
            </h3>
            <p className="text-xs text-gray-400 mt-1">{error}</p>
          </div>
          <button
            onClick={refetch}
            className="px-4 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition cursor-pointer"
          >
            Tentar novamente
          </button>
        </div>
      </AdminPainelBase>
    );
  }

  // Cálculos para a barra de progresso de vagas
  const totalSpots = 400;
  const filledSpots = totalSpots - stats.remaining_spots;
  const filledPercentage = (filledSpots / totalSpots) * 100;

  // Helper para estilizar as badges de status
  const statusStyles = {
    approved: {
      bg: "bg-emerald-50 text-emerald-700 border-emerald-100",
      label: "Aprovado",
    },
    pending: {
      bg: "bg-amber-50 text-amber-700 border-amber-100",
      label: "Pendente",
    },
    expired: {
      bg: "bg-slate-100 text-slate-600 border-slate-200",
      label: "Expirado",
    },
    cancelled: {
      bg: "bg-red-50 text-red-700 border-red-100",
      label: "Cancelado",
    },
  };

  return (
    <AdminPainelBase>
      <div className="space-y-6">
        {/* SEÇÃO 1: CARDS DE RESUMO FINANCEIRO E VAGAS */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card: Receita Realizada */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Arrecadação Total
              </p>
              <h3 className="text-2xl font-black text-slate-800 mt-1">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(stats.total_revenue)}
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
                <p className="text-lg font-black text-slate-800">
                  {stats.pending}
                </p>
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

        {/* SEÇÃO 2: PROGRESSO OCUPAÇÃO DO EVENTO */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h4 className="text-sm font-bold text-slate-800">
                Ocupação do Evento
              </h4>
              <p className="text-xs text-gray-400">
                Percentual de vagas preenchidas no lote atual
              </p>
            </div>
            <span className="text-sm font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg self-start sm:self-auto">
              {filledPercentage.toFixed(1)}% preenchido
            </span>
          </div>
          {/* Barra de Progresso Tridimensional */}
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${filledPercentage}%` }}
            />
          </div>
        </div>

        {/* SEÇÃO 3: TABELA / GRID RESPONSIVO DE ÚLTIMOS INSCRITOS */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserPlus size={18} className="text-gray-400" />
              <h4 className="text-sm font-bold text-slate-800">
                Últimas Inscrições
              </h4>
            </div>
            <Link
              to={"/admin/participantes"}
              className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer flex items-center gap-1"
            >
              Ver todos <ArrowRight size={14} />
            </Link>
          </div>

          {/* Versão Desktop (Tabela Completa - Oculta no mobile) */}
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
                {stats.latest_registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-4 px-6">
                      <p className="font-bold text-gray-800">
                        {reg.participant.full_name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {reg.participant.city}
                      </p>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs font-semibold text-gray-500">
                      {reg.ticket_number}
                    </td>
                    <td className="py-4 px-6 text-gray-600 font-medium">
                      {reg.ticket_lot.name}
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-700">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(reg.amount)}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full border ${statusStyles[reg.status].bg}`}
                      >
                        {statusStyles[reg.status].label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Versão Mobile (Cards Empilhados - Oculta no Desktop) */}
          <div className="block md:hidden divide-y divide-slate-100">
            {stats.latest_registrations.map((reg) => (
              <div
                key={reg.id}
                className="p-4 space-y-3 hover:bg-slate-50/40 transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-gray-800">
                      {reg.participant.full_name}
                    </h5>
                    <p className="text-xs text-gray-400">
                      {reg.participant.city}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-bold rounded-full border ${statusStyles[reg.status].bg}`}
                  >
                    {statusStyles[reg.status].label}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl">
                  <div>
                    <p className="text-gray-400 font-medium">
                      Bilhete:{" "}
                      <span className="font-mono font-bold text-gray-600">
                        {reg.ticket_number}
                      </span>
                    </p>
                    <p className="text-gray-400 font-medium mt-0.5">
                      Lote:{" "}
                      <span className="text-gray-600 font-semibold">
                        {reg.ticket_lot.name}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 font-medium">Valor</p>
                    <p className="font-black text-gray-800 text-sm">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(reg.amount)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminPainelBase>
  );
}
