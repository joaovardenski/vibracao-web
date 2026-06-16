import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import logoDioceseUV from "../assets/dioceseUV.png";
import { useAuth } from "../shared/hooks/useAuth";

interface AdminPainelBaseProps {
  children: React.ReactNode;
}

export default function AdminPainelBase({ children }: AdminPainelBaseProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { logout, admin } = useAuth();

  const location = useLocation();

  const menuItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin/dashboard",
    },
    {
      label: "Inscritos",
      icon: <Users size={20} />,
      path: "/admin/participantes",
    },
    {
      label: "Administradores",
      icon: <Settings size={20} />,
      path: "/admin/administradores",
    },
  ];

  const getPageTitle = () => {
    const currentItem = menuItems.find(
      (item) => item.path === location.pathname,
    );
    return currentItem ? currentItem.label : "Painel Administrativo";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex text-gray-800 font-sans antialiased">
      {/* 1. BACKDROP (Fundo escurecido no Mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-xs lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 2. SIDEBAR (Menu Lateral) */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Topo da Sidebar: Logo e Botão Fechar */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
            <div className="flex items-center gap-3">
              <img
                src={logoDioceseUV}
                alt="Diocese"
                className="h-9 w-auto object-contain"
              />
              <div>
                <h2 className="text-sm font-black text-indigo-900 leading-tight">
                  Vibração Jovem
                </h2>
                <span className="text-[10px] font-bold text-indigo-600 tracking-wider uppercase">
                  Painel Admin
                </span>
              </div>
            </div>

            {/* Botão Fechar (Apenas Mobile) */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-slate-50 hover:text-gray-600 lg:hidden transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Links de Navegação Modificados para a tag <Link> */}
          <nav className="flex flex-col gap-1">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 w-full px-4 py-3.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 shadow-xs"
                      : "text-gray-500 hover:bg-slate-50 hover:text-gray-900"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Rodapé da Sidebar: Usuário/Logout */}
        <div className="pt-4 border-t border-slate-50 flex flex-col gap-3">
          <div className="flex items-center gap-3 px-2">
            <div className="h-9 w-9 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-100">
              AD
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-gray-800 truncate">
                Administrador
              </p>
              <p className="text-[10px] font-medium text-gray-400 truncate">
                {admin?.email}
              </p>
            </div>
          </div>

          <button
            onClick={() => logout()}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition cursor-pointer"
          >
            <LogOut size={18} />
            Sair do sistema
          </button>
        </div>
      </aside>

      {/* 3. CONTEÚDO PRINCIPAL */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Navbar de Topo */}
        <header className="h-16 bg-white border-b border-slate-100 px-4 sm:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {/* Botão Hambúrguer (Apenas Mobile) */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-xl text-gray-500 hover:bg-slate-50 hover:text-gray-800 lg:hidden transition cursor-pointer"
            >
              <Menu size={22} />
            </button>

            {/* Título Dinâmico baseado na rota acessada */}
            <h1 className="text-base sm:text-lg font-black text-slate-800 tracking-tight">
              {getPageTitle()}
            </h1>
          </div>

          {/* Badge de Conexão Segura */}
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
            <ShieldCheck size={14} />
            <span className="hidden sm:inline">Ambiente</span> Seguro
          </div>
        </header>

        {/* Área do Conteúdo */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
