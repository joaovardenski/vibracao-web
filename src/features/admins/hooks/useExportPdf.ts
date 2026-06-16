// hooks/useExportPdf.ts
import { useState } from "react";
import api from "../../../services/api";

export function useExportPdf() {
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function exportPdf() {
    try {
      setExporting(true);
      setError(null);

      const response = await api.get("/admin/registrations/export-pdf", {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `participantes-vibracao-jovem-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch {
      setError("Não foi possível gerar o PDF. Tente novamente.");
    } finally {
      setExporting(false);
    }
  }

  return { exportPdf, exporting, error };
}
