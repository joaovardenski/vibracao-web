import { XCircle } from "lucide-react";
import AdminPainelBase from "../../../layouts/AdminPainelBase";
import { useDashboard } from "../hooks/useDashboard";
import DashboardOverviewCards from "../components/DashboardOverviewCards";
import DashboardProgressBar from "../components/DashboardProgressBar";
import DashboardLatestRegistrations from "../components/DashboardLatestRegistrations";

export default function Dashboard() {
  const { stats, loading, error, refetch } = useDashboard();
  const totalSpots = 400;

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

  const filledSpots = totalSpots - stats.remaining_spots;
  const filledPercentage = (filledSpots / totalSpots) * 100;

  return (
    <AdminPainelBase>
      <div className="space-y-6">
        <DashboardOverviewCards
          stats={stats}
          totalSpots={totalSpots}
          filledSpots={filledSpots}
        />

        <DashboardProgressBar filledPercentage={filledPercentage} />

        <DashboardLatestRegistrations
          registrations={stats.latest_registrations}
        />
      </div>
    </AdminPainelBase>
  );
}
