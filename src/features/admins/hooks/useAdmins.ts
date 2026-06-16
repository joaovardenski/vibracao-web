import { useState, useEffect } from "react";
import api from "../../../services/api";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

interface PaginationData {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}

export function useAdmins() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        const response = await api.get("/admin/admins", {
          params: {
            page: currentPage,
            search: search || undefined,
            per_page: 10,
          },
        });
        if (cancelled) return;
        if (response.data.success) {
          setAdmins(response.data.data.data);
          setPagination({
            current_page: response.data.data.current_page,
            last_page: response.data.data.last_page,
            total: response.data.data.total,
            per_page: response.data.data.per_page,
          });
        }
      } catch (error) {
        if (!cancelled)
          console.error("Erro ao carregar administradores", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [currentPage, search, version]);

  const changeSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const refetch = () => setVersion((v) => v + 1);

  return {
    admins,
    pagination,
    search,
    currentPage,
    loading,
    changeSearch,
    setCurrentPage,
    refetch,
  };
}
