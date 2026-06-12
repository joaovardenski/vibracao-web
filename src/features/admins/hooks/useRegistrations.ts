// hooks/useRegistrations.ts
import { useEffect, useState, useCallback } from "react";
import api from "../../../services/api";
import type { Registration, PaginatedResponse } from "../types/adminTypes";

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

export function useRegistrations(page: number, search: string) {
  const [data, setData] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });

  const fetchRegistrations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<
        ApiEnvelope<PaginatedResponse<Registration>>
      >("/admin/registrations", {
        params: {
          page,
          search: search || undefined,
        },
      });
      const paginator = response.data.data;
      setData(paginator.data);
      setPagination({
        current_page: paginator.current_page,
        last_page: paginator.last_page,
        total: paginator.total,
      });
    } catch {
      setError("Não foi possível carregar a lista de inscritos.");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    const timeout = setTimeout(fetchRegistrations, 300);
    return () => clearTimeout(timeout);
  }, [fetchRegistrations]);

  return {
    registrations: data,
    loading,
    error,
    pagination,
    reload: fetchRegistrations,
  };
}
