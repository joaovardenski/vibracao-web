import logoDioceseUV from "../../../assets/dioceseUV.png";

interface RegisterHeaderProps {
  currentStep: 1 | 2;
}

export default function RegisterHeader({ currentStep }: RegisterHeaderProps) {
  return (
    <div className="relative overflow-hidden bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-8 text-center text-white">
      <div className="absolute top-0 left-0 h-full w-full opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[16px_16px]" />

      {/* LOGO DA DIOCESE */}
      <div className="flex justify-center mb-4">
        <img
          src={logoDioceseUV}
          alt="Diocese de União da Vitória"
          className="h-14 w-auto object-contain opacity-90"
        />
      </div>

      {/* Badge Ano */}
      <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-pink-100 backdrop-blur-sm mb-2">
        Inscrições Abertas
      </span>

      <h1 className="text-3xl font-black tracking-tight sm:text-4xl drop-shadow-sm bg-clip-text">
        Vibração Jovem 2026
      </h1>

      {/* Barra de Progresso Visual Interativa */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <div
          className={`h-2 w-16 rounded-full transition-all duration-300 ${
            currentStep === 1 ? "bg-white w-24" : "bg-white/40"
          }`}
        />
        <div
          className={`h-2 w-16 rounded-full transition-all duration-300 ${
            currentStep === 2 ? "bg-white w-24" : "bg-white/40"
          }`}
        />
      </div>
    </div>
  );
}