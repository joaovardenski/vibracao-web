import {
  User,
  X,
  CreditCard,
  Mail,
  MapPin,
  Calendar,
  Phone,
} from "lucide-react";
import type { Registration } from "../types/adminTypes";
import { formatDateTime } from "../../../shared/utils/format";

interface ParticipantDrawerProps {
  registration: Registration | null;
  onClose: () => void;
}

export default function ParticipantDrawer({ registration, onClose }: ParticipantDrawerProps) {
  if (!registration) return null;

  const formattedAmount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(registration.amount));

  const whatsappLink = `https://wa.me/55${registration.participant.phone.replace(/\D/g, "")}`;

  return (
    <>
      <div
        className="fixed h-full inset-0 z-50 bg-gray-900/30 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">
        <div>
          <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                <User size={20} />
              </div>

              <div>
                <h3 className="text-base font-black text-slate-800 leading-tight">
                  {registration.participant.full_name}
                </h3>
                <p className="text-xs font-mono text-gray-400 mt-0.5">
                  {registration.ticket_number}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:bg-slate-50 hover:text-gray-600 rounded-lg transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-5 overflow-y-auto max-h-[70vh] pr-1">
            <div className="bg-slate-50 p-3 rounded-xl flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase">
                Situação
              </span>
              <span className="inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-full border bg-emerald-50 text-emerald-700 border-emerald-100">
                Aprovado
              </span>
            </div>

            <div className="space-y-3">
              <h4 className="text-[11px] font-black uppercase tracking-wider text-indigo-600">
                Dados Gerais
              </h4>

              <InfoItem
                icon={<CreditCard size={16} />}
                label="CPF"
                value={registration.participant.cpf}
              />

              <InfoItem
                icon={<Mail size={16} />}
                label="E-mail"
                value={registration.participant.email}
              />

              <InfoItem
                icon={<MapPin size={16} />}
                label="Cidade / Paróquia"
                value={
                  <>
                    <p>{registration.participant.city}</p>
                    <p className="text-xs text-gray-500">
                      {registration.participant.parish}
                    </p>
                  </>
                }
              />
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h4 className="text-[11px] font-black uppercase tracking-wider text-red-500">
                Contatos de Segurança
              </h4>
              <div className="bg-red-50/40 border border-red-100/60 p-3 rounded-xl text-xs text-gray-700">
                {registration.participant.emergency_contact || "Nenhum contato cadastrado."}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-xs text-gray-400 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                Inscrito em: {formatDateTime(registration.created_at)}
              </span>
              <span className="font-bold text-gray-700">
                Valor Pago: {formattedAmount}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 py-3 text-sm font-bold text-white text-center"
          >
            <Phone size={16} />
            Chamar no WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 text-sm text-gray-600">
      <div className="text-gray-400 shrink-0 mt-0.5">{icon}</div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <div className="font-semibold text-gray-800 break-all">{value}</div>
      </div>
    </div>
  );
}