
import React from 'react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white pt-32 pb-16 border-t border-zinc-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-8 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="w-6 h-6 bg-zinc-900 rounded flex items-center justify-center text-white font-bold text-xs mr-3">
                A
              </div>
              <span className="text-base font-bold text-zinc-900 tracking-tight">AgendaMaster</span>
            </div>
            <p className="text-zinc-400 text-sm font-light leading-relaxed">
              O novo padrão em agendamento executivo. <br/> Simplicidade como sofisticação final.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 text-xs uppercase tracking-widest mb-8">Produto</h4>
            <ul className="space-y-4 text-zinc-500 text-sm font-light">
              <li><button onClick={() => onNavigate('home')} className="hover:text-zinc-900 transition-colors">Corporativo</button></li>
              <li><button onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('pricing')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="hover:text-zinc-900 transition-colors">Planos de Preço</button></li>
              <li><button onClick={() => onNavigate('success-stories')} className="hover:text-zinc-900 transition-colors">Casos de Sucesso</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 text-xs uppercase tracking-widest mb-8">Recursos</h4>
            <ul className="space-y-4 text-zinc-500 text-sm font-light">
              <li><button onClick={() => onNavigate('resources')} className="hover:text-zinc-900 transition-colors">Base de Conhecimento</button></li>
              <li><button onClick={() => onNavigate('resources')} className="hover:text-zinc-900 transition-colors">Documentação API</button></li>
              <li><button onClick={() => onNavigate('resources')} className="hover:text-zinc-900 transition-colors">Comunidade</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 text-xs uppercase tracking-widest mb-8">Empresa</h4>
            <ul className="space-y-4 text-zinc-500 text-sm font-light">
              <li><button onClick={() => onNavigate('resources')} className="hover:text-zinc-900 transition-colors text-left">Sobre Nós</button></li>
              <li><button onClick={() => onNavigate('resources')} className="hover:text-zinc-900 transition-colors text-left">Jurídico e Privacidade</button></li>
              <li><button onClick={() => onNavigate('resources')} className="hover:text-zinc-900 transition-colors text-left">Ativos da Marca</button></li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-zinc-50 flex flex-col md:flex-row justify-between items-center text-zinc-300 text-[10px] font-bold uppercase tracking-[0.2em]">
          <p>© 2024 AgendaMaster • Protocolo de Direitos Reservados</p>
          <div className="flex space-x-10 mt-6 md:mt-0">
            <span className="text-zinc-400">DESENVOLVIDO EM BERLIM</span>
            <span className="text-zinc-400">ACESSO GLOBAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
