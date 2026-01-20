
import React from 'react';
import { UserRole } from '../types';

interface NavbarProps {
  role: UserRole;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ role, onNavigate, onLogout }) => {
  return (
    <nav className="sticky top-0 z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="w-8 h-8 bg-zinc-900 rounded-md flex items-center justify-center text-white font-bold text-lg mr-3 group-hover:bg-zinc-800 transition-colors">
              A
            </div>
            <span className="text-lg font-semibold tracking-tight text-zinc-900">AgendaMaster</span>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            <button onClick={() => onNavigate('home')} className="text-zinc-500 hover:text-zinc-900 text-sm font-medium transition-colors">Início</button>
            {role === 'client' && (
              <button onClick={() => onNavigate('explore')} className="text-zinc-500 hover:text-zinc-900 text-sm font-medium transition-colors">Explorar</button>
            )}
            {role === 'business' && (
              <button onClick={() => onNavigate('dashboard')} className="text-zinc-500 hover:text-zinc-900 text-sm font-medium transition-colors">Painel Executivo</button>
            )}
            
            <div className="h-4 w-[1px] bg-zinc-200"></div>

            {role === 'guest' ? (
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => onNavigate('login')} 
                  className="text-sm font-semibold text-zinc-900 hover:opacity-70 transition-opacity"
                >
                  Entrar
                </button>
                <button 
                  onClick={() => onNavigate('register-business')}
                  className="bg-zinc-900 text-white px-5 py-2 rounded-full text-xs font-semibold tracking-wide hover:bg-zinc-800 transition-all shadow-sm"
                >
                  Cadastrar Empresa
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-8">
                <button 
                  onClick={() => onNavigate('appointments')}
                  className="text-zinc-500 hover:text-zinc-900 text-sm font-medium transition-colors"
                >
                  Agendamentos
                </button>
                <button 
                  onClick={onLogout}
                  className="bg-zinc-900 text-white px-5 py-2 rounded-full text-xs font-semibold tracking-wide hover:bg-zinc-800 transition-all"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
