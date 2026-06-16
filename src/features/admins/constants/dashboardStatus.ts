export const DASHBOARD_STATUS_STYLES = {
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
} as const;
