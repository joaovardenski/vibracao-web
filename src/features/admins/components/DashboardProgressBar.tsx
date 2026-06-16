interface ProgressBarProps {
  filledPercentage: number;
}

export default function DashboardProgressBar({ filledPercentage }: ProgressBarProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h4 className="text-sm font-bold text-slate-800">Ocupação do Evento</h4>
          <p className="text-xs text-gray-400">Percentual de vagas preenchidas no lote atual</p>
        </div>
        <span className="text-sm font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg self-start sm:self-auto">
          {filledPercentage.toFixed(1)}% preenchido
        </span>
      </div>
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${filledPercentage}%` }}
        />
      </div>
    </div>
  );
}