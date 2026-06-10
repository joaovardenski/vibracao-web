import { useState, useEffect, useCallback } from "react";
import api from "../services/api";

interface Participant {
  id: number;
  full_name: string;
  city: string;
}

interface TicketLot {
  id: number;
  name: string;
}

export interface LatestRegistration {
  id: number;
  ticket_number: string;
  status: "approved" | "pending" | "expired" | "cancelled";
  amount: number;
  participant: Participant;
  ticket_lot: TicketLot;
}

export interface DashboardStats {
  approved: number;
  pending: number;
  expired: number;
  cancelled: number;
  total_revenue: number;
  remaining_spots: number;
  latest_registrations: LatestRegistration[];
}

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Para refetch externo (ex: botão de atualizar)
  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/admin/dashboard");
      setStats(data.data);
    } catch {
      setError("Erro ao carregar os dados do dashboard.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Inicialização — lógica inline para o ESLint não reclamar
  useEffect(() => {
    async function init() {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get("/admin/dashboard");
        setStats(data.data);
      } catch {
        setError("Erro ao carregar os dados do dashboard.");
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  return { stats, loading, error, refetch: fetchStats };
}