import { useEffect, useState } from "react";
import api from "../services/api";

export type PaymentStatus = "approved" | "pending" | "failure";

export interface PaymentDetails {
  participant: {
    name: string;
    email: string;
  };

  ticket: {
    lot: string;
    amount: number;
    ticket_number: string;
  };
}

interface PaymentStatusResponse {
  status: string;
  participant: {
    name: string;
    email: string;
  };
  ticket: {
    lot: string;
    amount: number;
    ticket_number: string;
  };
}

export function usePaymentStatus() {
  const [status, setStatus] = useState<PaymentStatus | null>(null);

  const [details, setDetails] = useState<PaymentDetails | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  async function fetchStatus() {
    try {
      setError(false);

      const params = new URLSearchParams(window.location.search);

      const externalReference = params.get("external_reference");

      if (!externalReference) {
        setStatus("failure");
        return;
      }

      const { data } = await api.get<PaymentStatusResponse>(
        `/orders/${externalReference}/status`,
      );

      setDetails({
        participant: data.participant,
        ticket: data.ticket,
      });

      switch (data.status) {
        case "approved":
          setStatus("approved");
          break;

        case "pending":
          setStatus("pending");
          break;

        default:
          setStatus("failure");
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void (async () => {
      await fetchStatus();
    })();
  }, []);

  useEffect(() => {
    if (status !== "pending") {
      return;
    }

    const interval = setInterval(fetchStatus, 5000);

    return () => clearInterval(interval);
  }, [status]);

  return {
    status,
    details,
    loading,
    error,
    refresh: fetchStatus,
  };
}
