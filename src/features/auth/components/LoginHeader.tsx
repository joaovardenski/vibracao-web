import { ShieldCheck } from "lucide-react";
import logoDioceseUV from "../../../assets/dioceseUV.png";

export default function LoginHeader() {
  return (
    <div className="relative overflow-hidden rounded-t-3xl bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-8 text-center text-white">
      <div className="absolute top-0 left-0 h-full w-full opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[16px_16px]" />

      <div className="flex justify-center mb-4">
        <img
          src={logoDioceseUV}
          alt="Diocese de União da Vitória"
          className="h-14 w-auto object-contain opacity-95 filter drop-shadow-sm"
        />
      </div>

      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-pink-100 backdrop-blur-sm mb-3">
        <ShieldCheck size={13} className="text-pink-200" />
        Área Restrita
      </span>

      <h1 className="text-3xl font-black tracking-tight drop-shadow-sm">
        Vibração Jovem 2026
      </h1>

      <p className="mt-1 text-indigo-200/90 text-xs font-bold uppercase tracking-widest">
        Painel Administrativo
      </p>
    </div>
  );
}