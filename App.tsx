
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BusinessCard from './components/BusinessCard';
import { User, Business, Appointment, UserRole } from './types';
import { MOCK_BUSINESSES, CATEGORIES, BRAZILIAN_STATES } from './constants';
import { getSmartBusinessRecommendations } from './services/geminiService';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [activeResourceTab, setActiveResourceTab] = useState<string | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>(MOCK_BUSINESSES);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [isSmartSearching, setIsSmartSearching] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro'>('pro');

  // Registration Form States
  const [regName, setRegName] = useState('');
  const [regCategory, setRegCategory] = useState(CATEGORIES[0]);
  const [regCustomCategory, setRegCustomCategory] = useState('');
  const [regState, setRegState] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regDesc, setRegDesc] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, activeResourceTab]);

  const handleLogin = (role: UserRole) => {
    setUser({
      id: role === 'business' ? 'u2' : 'u1',
      name: role === 'business' ? 'Proprietário' : 'Cliente João',
      email: role === 'business' ? 'biz@example.com' : 'client@example.com',
      role: role
    });
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleRegisterBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCategory = regCategory === 'Outros' ? regCustomCategory : regCategory;
    const newBiz: Business = {
      id: `b-${Date.now()}`,
      ownerId: 'u-current',
      name: regName,
      category: finalCategory,
      description: regDesc,
      address: regAddress,
      price: 'Sob Consulta',
      image: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 1000000)}?auto=format&fit=crop&q=80&w=800`,
      rating: 5.0,
      location: regState,
      availableSlots: [new Date().toISOString()]
    };
    setBusinesses([newBiz, ...businesses]);
    setSelectedState(regState);
    handleLogin('business');
    setCurrentPage('explore');
  };

  const handleSmartSearch = async () => {
    if (!searchTerm.trim()) return;
    setIsSmartSearching(true);
    await getSmartBusinessRecommendations(searchTerm, businesses);
    setIsSmartSearching(false);
  };

  const createAppointment = (businessId: string, date: string) => {
    if (!user) {
      setCurrentPage('login');
      return;
    }
    const biz = businesses.find(b => b.id === businessId);
    const newAppointment: Appointment = {
      id: `app-${Date.now()}`,
      businessId,
      clientId: user.id,
      date,
      status: 'pending',
      serviceName: biz?.category || 'Serviço'
    };
    setAppointments([...appointments, newAppointment]);
    setCurrentPage('appointments');
  };

  const filteredBusinesses = businesses.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         b.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedState === '' || b.location.toLowerCase().includes(selectedState.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  const renderKnowledgeBase = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={() => setActiveResourceTab(null)} className="mb-12 text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center hover:text-zinc-900 transition-colors">
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        Voltar para Central
      </button>
      <h3 className="text-3xl font-bold text-zinc-900 mb-10">Base de Conhecimento</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { title: "Primeiros Passos no AgendaMaster", desc: "Aprenda a configurar seu perfil e horários de atendimento em menos de 5 minutos.", time: "4 min leitura" },
          { title: "Otimizando sua Conversão", desc: "Como usar fotos de alta qualidade e descrições persuasivas para atrair mais clientes.", time: "6 min leitura" },
          { title: "Gestão Financeira e Planos", desc: "Entenda como funcionam as renovações e os benefícios do Plano Profissional.", time: "3 min leitura" },
          { title: "Políticas de Cancelamento", desc: "Como configurar regras automáticas para evitar faltas e otimizar seu tempo.", time: "5 min leitura" }
        ].map((article, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-zinc-100 hover:border-zinc-300 transition-all cursor-pointer group">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">{article.time}</p>
            <h4 className="text-lg font-bold text-zinc-900 mb-2 group-hover:text-zinc-600 transition-colors">{article.title}</h4>
            <p className="text-zinc-500 text-sm font-light leading-relaxed">{article.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderApiDocs = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={() => setActiveResourceTab(null)} className="mb-12 text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center hover:text-zinc-900 transition-colors">
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        Voltar para Central
      </button>
      <h3 className="text-3xl font-bold text-zinc-900 mb-10">Documentação API</h3>
      <div className="space-y-12">
        <section>
          <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">Autenticação</h4>
          <p className="text-zinc-500 text-sm font-light mb-6">Utilize o seu API Token disponível no Painel Executivo para autenticar as requisições via Bearer Token.</p>
          <div className="bg-zinc-900 rounded-2xl p-6 font-mono text-xs text-zinc-400 overflow-x-auto">
            <span className="text-purple-400">Authorization:</span> Bearer <span className="text-green-400">AM_LIVE_TOKEN_XXXXX</span>
          </div>
        </section>
        <section>
          <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">Buscar Empresas</h4>
          <p className="text-zinc-500 text-sm font-light mb-6">Retorna a lista de empresas filtradas por categoria ou localização.</p>
          <div className="bg-zinc-900 rounded-2xl p-6 font-mono text-xs text-zinc-400 overflow-x-auto">
            <div className="mb-2"><span className="text-blue-400">GET</span> https://api.agendamaster.com/v1/businesses</div>
            <div className="text-zinc-600">{"{"}</div>
            <div className="pl-4">"category": <span className="text-green-400">"Barbearia"</span>,</div>
            <div className="pl-4">"location": <span className="text-green-400">"São Paulo"</span></div>
            <div className="text-zinc-600">{"}"}</div>
          </div>
        </section>
      </div>
    </div>
  );

  const renderCommunity = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={() => setActiveResourceTab(null)} className="mb-12 text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center hover:text-zinc-900 transition-colors">
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        Voltar para Central
      </button>
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-3xl font-bold text-zinc-900">Comunidade</h3>
        <button className="bg-zinc-900 text-white px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all">Novo Tópico</button>
      </div>
      <div className="space-y-4">
        {[
          { title: "Como vocês lidam com cancelamentos em cima da hora?", author: "Marcos (Studio Hair)", replies: 24, tag: "Gestão" },
          { title: "Dicas de tráfego pago para serviços locais (Google Ads)", author: "Clínica OdontoPlus", replies: 56, tag: "Marketing" },
          { title: "Networking: Busco parceiros para eventos de estética em Curitiba", author: "Ana Beauty", replies: 12, tag: "Parcerias" },
          { title: "Sugestão de nova feature: Pagamento integrado direto no app", author: "PetCare Shop", replies: 89, tag: "Feedback" }
        ].map((topic, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-zinc-100 flex items-center justify-between group cursor-pointer hover:bg-zinc-50 transition-all">
            <div className="flex-grow">
              <span className="inline-block bg-zinc-100 text-zinc-500 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter mb-2">{topic.tag}</span>
              <h4 className="text-base font-semibold text-zinc-900 mb-1 group-hover:text-zinc-600 transition-colors">{topic.title}</h4>
              <p className="text-zinc-400 text-[10px] font-light italic">Iniciado por {topic.author}</p>
            </div>
            <div className="text-right ml-6">
              <span className="text-sm font-bold text-zinc-900">{topic.replies}</span>
              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Respostas</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Added renderRegisterBusiness function to fix the error
  const renderRegisterBusiness = () => (
    <div className="max-w-2xl mx-auto py-24 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-zinc-900 tracking-tight mb-4">Seu negócio, nível global.</h2>
        <p className="text-zinc-500 font-light text-lg">Preencha os detalhes da sua empresa para começar.</p>
      </div>

      <form onSubmit={handleRegisterBusiness} className="space-y-8 bg-white p-12 rounded-[2.5rem] premium-shadow border border-zinc-50">
        <div>
          <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Nome da Empresa</label>
          <input 
            required 
            type="text" 
            className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border-none focus:ring-2 focus:ring-zinc-900 focus:outline-none transition-all"
            value={regName}
            onChange={(e) => setRegName(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Categoria</label>
            <select 
              className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border-none focus:ring-2 focus:ring-zinc-900 focus:outline-none transition-all appearance-none cursor-pointer"
              value={regCategory}
              onChange={(e) => setRegCategory(e.target.value)}
            >
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Estado (Localização)</label>
            <select 
              required
              className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border-none focus:ring-2 focus:ring-zinc-900 focus:outline-none transition-all appearance-none cursor-pointer"
              value={regState}
              onChange={(e) => setRegState(e.target.value)}
            >
              <option value="">Selecione...</option>
              {BRAZILIAN_STATES.map(state => <option key={state} value={state}>{state}</option>)}
            </select>
          </div>
        </div>

        {regCategory === 'Outros' && (
          <div className="animate-in fade-in duration-300">
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Especifique a Categoria</label>
            <input 
              required 
              type="text" 
              className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border-none focus:ring-2 focus:ring-zinc-900 focus:outline-none transition-all"
              value={regCustomCategory}
              onChange={(e) => setRegCustomCategory(e.target.value)}
            />
          </div>
        )}

        <div>
          <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Endereço Físico Completo</label>
          <input 
            required 
            type="text" 
            className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border-none focus:ring-2 focus:ring-zinc-900 focus:outline-none transition-all"
            placeholder="Ex: Av. Paulista, 1000 - Bela Vista"
            value={regAddress}
            onChange={(e) => setRegAddress(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Descrição Premium</label>
          <textarea 
            required 
            rows={4} 
            className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border-none focus:ring-2 focus:ring-zinc-900 focus:outline-none transition-all resize-none"
            placeholder="Conte aos clientes o que torna seu serviço excepcional..."
            value={regDesc}
            onChange={(e) => setRegDesc(e.target.value)}
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-5 bg-zinc-900 text-white rounded-2xl font-bold text-sm tracking-widest uppercase hover:bg-zinc-800 transition-all premium-shadow"
        >
          {selectedPlan === 'pro' ? 'Ativar Plano Profissional' : 'Finalizar Cadastro'}
        </button>
      </form>
    </div>
  );

  const renderResources = () => (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32">
      {!activeResourceTab ? (
        <>
          <div className="text-center mb-24 animate-in fade-in duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-6">Central de Recursos</h2>
            <p className="text-zinc-500 font-light max-w-2xl mx-auto text-lg leading-relaxed">
              Tudo o que você precisa para dominar a plataforma e escalar sua operação com excelência.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-100 premium-shadow card-hover">
              <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-white mb-8">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-4">Base de Conhecimento</h3>
              <p className="text-zinc-500 text-sm font-light leading-relaxed mb-8">Tutoriais completos, FAQs e melhores práticas para configurar seu negócio.</p>
              <button onClick={() => setActiveResourceTab('kb')} className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors">Ver Artigos →</button>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-100 premium-shadow card-hover">
              <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-white mb-8">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-4">Documentação API</h3>
              <p className="text-zinc-500 text-sm font-light leading-relaxed mb-8">Conecte o AgendaMaster aos seus fluxos de trabalho via Webhooks e REST API.</p>
              <button onClick={() => setActiveResourceTab('api')} className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors">Documentação →</button>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-100 premium-shadow card-hover">
              <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-white mb-8">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-4">Comunidade</h3>
              <p className="text-zinc-500 text-sm font-light leading-relaxed mb-8">Conecte-se com outros empreendedores, compartilhe sucessos e colabore.</p>
              <button onClick={() => setActiveResourceTab('community')} className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors">Acessar Fórum →</button>
            </div>
          </div>
        </>
      ) : (
        <div className="max-w-4xl mx-auto">
          {activeResourceTab === 'kb' && renderKnowledgeBase()}
          {activeResourceTab === 'api' && renderApiDocs()}
          {activeResourceTab === 'community' && renderCommunity()}
        </div>
      )}
    </div>
  );

  const renderHome = () => (
    <div className="space-y-32">
      <section className="relative py-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold text-zinc-900 tracking-tight leading-[1.05] mb-10">
              Gestão de tempo <br/> <span className="text-zinc-400">em estado puro.</span>
            </h1>
            <p className="text-xl text-zinc-500 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Agende serviços premium ou automatize seu negócio com a plataforma que define the novo padrão de eficiência.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button onClick={() => setCurrentPage('explore')} className="w-full sm:w-auto px-10 py-5 bg-zinc-900 text-white rounded-full font-semibold text-sm hover:bg-zinc-800 transition-all premium-shadow">Explorar serviços</button>
              <button onClick={() => setCurrentPage('register-business')} className="w-full sm:w-auto px-10 py-5 bg-transparent text-zinc-900 border border-zinc-200 rounded-full font-semibold text-sm hover:bg-zinc-50 transition-all">Registrar empresa</button>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-10" id="pricing">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-zinc-900 tracking-tight mb-4">Planos de Performance</h2>
          <p className="text-zinc-500 font-light">Escale conforme seu negócio cresce. Sem taxas ocultas.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="bg-white rounded-[2rem] border border-zinc-100 p-10 flex flex-col premium-shadow transition-all hover:border-zinc-200">
            <div className="mb-8">
              <h3 className="text-zinc-400 font-bold text-xs uppercase tracking-widest mb-2">Essencial</h3>
              <div className="flex items-baseline text-zinc-900"><span className="text-4xl font-bold">Grátis</span></div>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              {['Até 20 agendamentos/mês', 'Perfil público de empresa', 'Exibição de endereço físico', 'Notificações básicas por e-mail', 'Suporte via Base de Conhecimento'].map((b, i) => (
                <li key={i} className="flex items-center text-sm text-zinc-500 font-light"><svg className="w-4 h-4 mr-3 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>{b}</li>
              ))}
            </ul>
            <button onClick={() => { setSelectedPlan('free'); setCurrentPage('register-business'); }} className="w-full py-4 bg-zinc-50 text-zinc-900 rounded-2xl font-semibold text-sm hover:bg-zinc-100 transition-all">Começar agora</button>
          </div>
          <div className="bg-zinc-900 rounded-[2rem] p-10 flex flex-col shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6"><span className="bg-white/10 text-white/50 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Popular</span></div>
            <div className="mb-8">
              <h3 className="text-zinc-500 font-bold text-xs uppercase tracking-widest mb-2">Profissional</h3>
              <div className="flex items-baseline text-white"><span className="text-4xl font-bold tracking-tight">R$ 49,90</span><span className="text-zinc-500 ml-2 text-sm">/mês</span></div>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              {['Agendamentos ilimitados', 'Prioridade na Busca com IA', 'Painel Executivo de Métricas', 'Notificações via WhatsApp', 'Selo de Verificação Premium', 'Suporte Prioritário 24/7'].map((b, i) => (
                <li key={i} className="flex items-center text-sm text-zinc-400 font-light"><svg className="w-4 h-4 mr-3 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>{b}</li>
              ))}
            </ul>
            <button onClick={() => { setSelectedPlan('pro'); setCurrentPage('register-business'); }} className="w-full py-4 bg-white text-zinc-900 rounded-2xl font-semibold text-sm hover:opacity-90 transition-all shadow-xl shadow-white/5">Assinar Plano Pro</button>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar role={user?.role || 'guest'} onNavigate={(p) => { setCurrentPage(p); setActiveResourceTab(null); }} onLogout={handleLogout} />
      <main className="flex-grow">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'explore' && (
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 animate-in fade-in duration-700">
            <h2 className="text-4xl font-bold text-zinc-900 tracking-tight mb-12">Encontre serviços impecáveis.</h2>
            <div className="max-w-3xl relative mb-16">
              <input type="text" placeholder="O que você está procurando hoje?" className="w-full pl-16 pr-32 py-5 rounded-3xl bg-white border border-zinc-100 focus:border-zinc-900 focus:outline-none premium-shadow text-base transition-all font-light" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSmartSearch()} />
              <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <button onClick={handleSmartSearch} disabled={isSmartSearching} className="absolute right-3 top-2.5 bottom-2.5 bg-zinc-900 text-white px-6 rounded-2xl text-xs font-bold hover:bg-zinc-800 transition-all disabled:opacity-50">{isSmartSearching ? '...' : 'BUSCA IA'}</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredBusinesses.map(biz => <BusinessCard key={biz.id} business={biz} onClick={(id) => createAppointment(id, biz.availableSlots[0])} />)}
            </div>
          </div>
        )}
        {currentPage === 'register-business' && renderRegisterBusiness()}
        {currentPage === 'resources' && renderResources()}
        {currentPage === 'appointments' && (
           <div className="max-w-4xl mx-auto py-32 px-6 animate-in fade-in duration-500">
              <h2 className="text-4xl font-bold text-zinc-900 tracking-tight mb-16">Seus Compromissos</h2>
              <div className="space-y-6">
                {appointments.length === 0 ? (
                  <div className="bg-white p-20 rounded-[2.5rem] text-center border-2 border-dashed border-zinc-100"><p className="text-zinc-400 font-light italic">Nenhum agendamento encontrado.</p></div>
                ) : (
                  appointments.map(app => <div key={app.id} className="bg-white p-8 rounded-[2rem] premium-shadow border border-zinc-50 flex items-center justify-between"><div className="flex items-center"><div className="w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 font-bold border border-zinc-100">A</div><div className="ml-6"><h4 className="text-base font-semibold text-zinc-900">{app.serviceName}</h4><p className="text-xs text-zinc-400 font-light mt-0.5">{new Date(app.date).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</p></div></div></div>)
                )}
              </div>
           </div>
        )}
        {currentPage === 'login' && <div className="max-w-md mx-auto py-32 px-6 animate-in zoom-in-95 duration-500"><div className="bg-white p-12 rounded-[2.5rem] premium-shadow border border-zinc-50"><h2 className="text-2xl font-semibold text-center text-zinc-900 mb-10">Acesse sua conta</h2><button onClick={() => handleLogin('client')} className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-semibold text-sm mb-4">Entrar como Cliente</button><button onClick={() => handleLogin('business')} className="w-full py-4 bg-white text-zinc-900 border border-zinc-200 rounded-2xl font-semibold text-sm">Acesso Empresa</button></div></div>}
      </main>
      <Footer onNavigate={(p) => { setCurrentPage(p); setActiveResourceTab(null); }} />
    </div>
  );
};

export default App;
