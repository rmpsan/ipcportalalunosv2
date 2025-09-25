import React, { useState } from 'react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { AccessMode } from '../types';

interface AccessScreenProps {
  onLogin: (type: 'intensive' | 'ead' | 'teacher', name?: string) => void;
}

const areasDeInteresse = ['Produção', 'Roteiro', 'Direção', 'IA Audiovisual', 'Pós-produção', 'Áudio'];

const AccessScreen: React.FC<AccessScreenProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AccessMode>(AccessMode.INTENSIVE_LOGIN);
  const [eadTab, setEadTab] = useState<'login' | 'register'>('login');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const addElement = useRevealOnScroll();

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const renderChoice = () => (
    <div className="animate-[fadeIn_0.5s_ease-out]">
      <h1 ref={addElement} className="reveal text-3xl md:text-5xl font-extrabold leading-tight mb-4 max-w-4xl mx-auto">Instituto Paulista de Cinema</h1>
      <p ref={addElement} className="reveal text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12" style={{ animationDelay: '0.2s' }}>
        Onde o talento da periferia se torna o futuro da comunicação premium e com propósito.
      </p>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div ref={addElement} onClick={() => setMode(AccessMode.INTENSIVE_LOGIN)} className="reveal access-card p-8 rounded-lg cursor-pointer transition-all duration-300 bg-black/30 backdrop-blur-md border border-white/20 hover:bg-white/10 hover:-translate-y-2 hover:shadow-2xl" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-2xl font-bold mb-3 text-teal-400">Sou Aluno (Programa Intensivo)</h2>
          <p className="text-gray-300">Acesse seu dashboard como aluno do programa remunerado de 12 meses em São Paulo.</p>
        </div>
        <div ref={addElement} onClick={() => setMode(AccessMode.EAD_HUB)} className="reveal access-card p-8 rounded-lg cursor-pointer transition-all duration-300 bg-black/30 backdrop-blur-md border border-white/20 hover:bg-white/10 hover:-translate-y-2 hover:shadow-2xl" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-2xl font-bold mb-3 text-cyan-400">Quero Acessar o Conteúdo (EAD)</h2>
          <p className="text-gray-300">Explore nosso acervo de aulas, palestras e workshops de todo o Brasil.</p>
        </div>
        <div ref={addElement} onClick={() => setMode(AccessMode.TEACHER_LOGIN)} className="reveal access-card p-8 rounded-lg cursor-pointer transition-all duration-300 bg-black/30 backdrop-blur-md border border-white/20 hover:bg-white/10 hover:-translate-y-2 hover:shadow-2xl" style={{ animationDelay: '0.8s' }}>
          <h2 className="text-2xl font-bold mb-3 text-purple-400">Sou Professor</h2>
          <p className="text-gray-300">Acesse o portal do professor para gerenciar turmas, notas e conteúdos didáticos.</p>
        </div>
      </div>
    </div>
  );

  const renderIntensiveLogin = () => (
    <div className="w-full max-w-md mx-auto animate-[fadeInUp_0.5s_ease-out]">
      <div className="bg-black/40 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border border-white/20">
        <div className="text-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-teal-400 mb-2">Instituto Paulista de Cinema</h1>
          <p className="text-xs sm:text-sm text-gray-300">Portal do Aluno - Programa Intensivo</p>
        </div>
        
        {/* Credenciais de demonstração */}
        <div className="bg-teal-900/30 border border-teal-500/30 rounded-lg p-3 sm:p-4 mb-6">
          <h3 className="text-xs sm:text-sm font-semibold text-teal-300 mb-2">📋 Credenciais de Demonstração</h3>
          <div className="text-xs text-gray-300 space-y-1">
            <p><span className="font-medium">Email:</span> teste@institutopaulistadecinema.com.br</p>
            <p><span className="font-medium">Senha:</span> ipcine123</p>
          </div>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-center text-white mb-6">Acesso do Aluno</h2>
        <form onSubmit={(e) => { e.preventDefault(); onLogin('intensive'); }} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email ou CPF</label>
            <input 
              type="text" 
              required 
              defaultValue="teste@institutopaulistadecinema.com.br"
              className="w-full bg-gray-800/50 border border-gray-600 rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-base touch-manipulation" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Senha</label>
            <input 
              type="password" 
              required 
              defaultValue="ipcine123"
              className="w-full bg-gray-800/50 border border-gray-600 rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-base touch-manipulation" 
            />
          </div>
          <button type="submit" className="w-full bg-teal-500 text-white font-bold py-4 px-4 rounded-lg hover:bg-teal-600 transition-all shadow-lg hover:shadow-teal-500/30 transform hover:-translate-y-1 touch-manipulation text-base">Entrar</button>
        </form>
        <div className="mt-6 pt-4 border-t border-gray-600">
          <button onClick={() => setMode(AccessMode.CHOICE)} className="w-full text-sm text-gray-400 hover:text-teal-300 transition-colors py-2 touch-manipulation">
            Outras opções de acesso →
          </button>
        </div>
      </div>
    </div>
  );

  const renderEadHub = () => (
    <div className="w-full max-w-2xl mx-auto animate-[fadeInUp_0.5s_ease-out]">
      <div className="bg-black/40 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
        <div className="p-8">
            <button onClick={() => setMode(AccessMode.CHOICE)} className="text-sm text-cyan-300 hover:text-cyan-100 mb-4">&larr; Voltar</button>
             <div className="flex border-b border-gray-600">
                <button onClick={() => setEadTab('login')} className={`py-3 px-6 font-semibold text-lg transition-all ${eadTab === 'login' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'}`}>Entrar</button>
                <button onClick={() => setEadTab('register')} className={`py-3 px-6 font-semibold text-lg transition-all ${eadTab === 'register' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'}`}>Cadastrar</button>
            </div>
        </div>

        <div className="p-8">
            {eadTab === 'login' ? (
                 <form onSubmit={(e) => { e.preventDefault(); onLogin('ead'); }} className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                     <h3 className="text-2xl font-bold text-white">Acesse o Conteúdo Digital</h3>
                     <div>
                        <label className="block text-sm font-medium text-gray-300">Email</label>
                        <input type="email" required className="mt-1 block w-full bg-gray-800/50 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Senha</label>
                        <input type="password" required className="mt-1 block w-full bg-gray-800/50 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                    </div>
                    <button type="submit" className="w-full bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-600 transition-all shadow-lg hover:shadow-cyan-500/30 transform hover:-translate-y-1">Acessar</button>
                 </form>
            ) : (
                <form onSubmit={(e) => { e.preventDefault(); onLogin('ead', (e.target as any).name.value); }} className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                    <h3 className="text-2xl font-bold text-white">Sua Voz Impulsiona o Futuro!</h3>
                     <p className="text-sm text-gray-400">O talento não tem CEP! Cadastre-se para acessar o conteúdo digital.</p>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Nome</label>
                            <input type="text" name="name" required className="mt-1 block w-full bg-gray-800/50 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Email</label>
                            <input type="email" required className="mt-1 block w-full bg-gray-800/50 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-300">Telefone</label>
                            <input type="tel" className="mt-1 block w-full bg-gray-800/50 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-300">Cidade/Estado</label>
                            <input type="text" className="mt-1 block w-full bg-gray-800/50 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                        </div>
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Área de Interesse Principal</label>
                        <div className="flex flex-wrap gap-2">
                            {areasDeInteresse.map(area => (
                                <button key={area} type="button" onClick={() => handleInterestToggle(area)} className={`px-3 py-1 text-sm rounded-full border transition-all ${selectedInterests.includes(area) ? 'bg-cyan-400 border-cyan-400 text-gray-900 font-semibold' : 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700'}`}>{area}</button>
                            ))}
                        </div>
                     </div>
                    <button type="submit" className="w-full bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-600 transition-all shadow-lg hover:shadow-cyan-500/30 transform hover:-translate-y-1">Criar Conta</button>
                    <p className="text-xs text-center text-gray-500">O programa intensivo (bolsa + DRT) tem requisitos específicos de idade, residência em SP e renda. <a href="#" className="underline hover:text-cyan-400">Saiba mais</a>.</p>
                </form>
            )}
        </div>
      </div>
    </div>
  );

  const renderTeacherLogin = () => (
    <div className="w-full max-w-md mx-auto animate-[fadeInUp_0.5s_ease-out]">
      <div className="bg-black/40 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border border-white/20">
        <div className="text-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-purple-400 mb-2">Instituto Paulista de Cinema</h1>
          <p className="text-xs sm:text-sm text-gray-300">Portal do Professor</p>
        </div>
        
        {/* Credenciais de demonstração */}
        <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-3 sm:p-4 mb-6">
          <h3 className="text-xs sm:text-sm font-semibold text-purple-300 mb-2">📋 Credenciais de Demonstração</h3>
          <div className="text-xs text-gray-300 space-y-1">
            <p><span className="font-medium">Email:</span> professor@institutopaulistadecinema.com.br</p>
            <p><span className="font-medium">Senha:</span> prof123</p>
          </div>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-center text-white mb-6">Acesso do Professor</h2>
        <form onSubmit={(e) => { e.preventDefault(); onLogin('teacher', 'Professor Demo'); }} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input 
              type="email" 
              required 
              defaultValue="professor@institutopaulistadecinema.com.br"
              className="w-full bg-gray-800/50 border border-gray-600 rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base touch-manipulation" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Senha</label>
            <input 
              type="password" 
              required 
              defaultValue="prof123"
              className="w-full bg-gray-800/50 border border-gray-600 rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base touch-manipulation" 
            />
          </div>
          <button type="submit" className="w-full bg-purple-500 text-white font-bold py-4 px-4 rounded-lg hover:bg-purple-600 transition-all shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-1 touch-manipulation text-base">Entrar</button>
        </form>
        <div className="mt-6 pt-4 border-t border-gray-600">
          <button onClick={() => setMode(AccessMode.CHOICE)} className="w-full text-sm text-gray-400 hover:text-purple-300 transition-colors py-2 touch-manipulation">
            Outras opções de acesso →
          </button>
        </div>
      </div>
    </div>
  );


  const renderContent = () => {
    switch (mode) {
      case AccessMode.INTENSIVE_LOGIN:
        return renderIntensiveLogin();
      case AccessMode.EAD_HUB:
        return renderEadHub();
      case AccessMode.TEACHER_LOGIN:
        return renderTeacherLogin();
      case AccessMode.CHOICE:
      default:
        return renderChoice();
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-800 bg-cover bg-center p-4 safe-area-inset" style={{ backgroundImage: `url('https://gov.institutopaulistadecinema.com.br/galeria/11.jpg')` }}>
      <div className="absolute inset-0 bg-gray-900/70"></div>
      <div className="container mx-auto text-center text-white relative z-10">
        {renderContent()}
      </div>
    </section>
  );
};

export default AccessScreen;