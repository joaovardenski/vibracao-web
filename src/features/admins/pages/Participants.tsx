import { useState } from "react";
import AdminPainelBase from "../../../layouts/AdminPainelBase";
import { useRegistrations } from "../hooks/useRegistrations";
import { useExportPdf } from "../hooks/useExportPdf";
import type { Registration } from "../types/adminTypes";

// Componentes Reestruturados
import ParticipantFilters from "../components/ParticipantFilters";
import ParticipantTable from "../components/ParticipantTable";
import ParticipantMobileList from "../components/ParticipantMobileList";
import ParticipantPagination from "../components/ParticipantPagination";
import ParticipantDrawer from "../components/ParticipantDrawer";
import ParticipantFormModal from "../components/ParticipantFormModal";

export default function Participants() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { registrations, loading, error, pagination } = useRegistrations(
    currentPage,
    search,
  );

  const { exportPdf, exporting, error: exportError } = useExportPdf();

  const handleRefreshData = () => {
    window.location.reload(); 
  };

  return (
    <AdminPainelBase>
      <div className="space-y-6 relative">
        
        {/* BLOCO DE FILTROS E BUSCA */}
        <ParticipantFilters
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
          onExport={exportPdf}
          exporting={exporting}
          exportError={exportError}
          onCreateClick={() => setIsCreateModalOpen(true)}
        />

        {/* LISTAGEM PRINCIPAL */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          
          {/* Estados Auxiliares de Interface */}
          {loading && (
            <div className="p-10 text-center text-sm text-gray-400">
              Carregando inscritos...
            </div>
          )}

          {!loading && error && (
            <div className="p-10 text-center text-sm text-red-500">{error}</div>
          )}

          {!loading && !error && registrations.length === 0 && (
            <div className="p-10 text-center text-sm text-gray-400">
              Nenhum inscrito encontrado.
            </div>
          )}

          {/* Listagens Renderizadas Condicionalmente */}
          {!loading && !error && registrations.length > 0 && (
            <>
              <ParticipantTable 
                registrations={registrations} 
                onSelect={setSelectedRegistration} 
              />
              <ParticipantMobileList 
                registrations={registrations} 
                onSelect={setSelectedRegistration} 
              />
            </>
          )}

          {/* COMPONENTE DE PAGINAÇÃO */}
          <ParticipantPagination
            currentPage={pagination.current_page}
            totalPages={pagination.last_page}
            totalItems={pagination.total}
            itemsShown={registrations.length}
            onPrevious={() => setCurrentPage((prev) => prev - 1)}
            onNext={() => setCurrentPage((prev) => prev + 1)}
          />
        </div>

        {/* DETALHES DO INSCRITO */}
        <ParticipantDrawer
          registration={selectedRegistration}
          onClose={() => setSelectedRegistration(null)}
        />

        {/* MODAL DE CRIAÇÃO */}
        <ParticipantFormModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={handleRefreshData}
        />
      </div>
    </AdminPainelBase>
  );
}