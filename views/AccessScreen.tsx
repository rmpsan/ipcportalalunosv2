import React, { useState } from 'react';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { AccessMode } from '../types';

interface AccessScreenProps {
  onLogin: (type: 'intensive' | 'ead', name?: string) => void;
}

const areasDeInteresse = ['Produção', 'Roteiro', 'Direção', 'IA Audiovisual', 'Pós-produção', 'Áudio'];

const AccessScreen: React.FC<AccessScreenProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AccessMode>(AccessMode.CHOICE);
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
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div ref={addElement} onClick={() => setMode(AccessMode.INTENSIVE_LOGIN)} className="reveal access-card p-8 rounded-lg cursor-pointer transition-all duration-300 bg-black/30 backdrop-blur-md border border-white/20 hover:bg-white/10 hover:-translate-y-2 hover:shadow-2xl" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-2xl font-bold mb-3 text-teal-400">Sou Aluno (Programa Intensivo)</h2>
          <p className="text-gray-300">Acesse seu dashboard como aluno do programa remunerado de 12 meses em São Paulo.</p>
        </div>
        <div ref={addElement} onClick={() => setMode(AccessMode.EAD_HUB)} className="reveal access-card p-8 rounded-lg cursor-pointer transition-all duration-300 bg-black/30 backdrop-blur-md border border-white/20 hover:bg-white/10 hover:-translate-y-2 hover:shadow-2xl" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-2xl font-bold mb-3 text-cyan-400">Quero Acessar o Conteúdo (EAD)</h2>
          <p className="text-gray-300">Explore nosso acervo de aulas, palestras e workshops de todo o Brasil.</p>
        </div>
      </div>
    </div>
  );

  const renderIntensiveLogin = () => (
    <div className="w-full max-w-md mx-auto animate-[fadeInUp_0.5s_ease-out]">
      <div className="bg-black/40 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
        <button onClick={() => setMode(AccessMode.CHOICE)} className="text-sm text-teal-300 hover:text-teal-100 mb-4">&larr; Voltar</button>
        <h2 className="text-3xl font-bold text-center text-teal-400 mb-6">Acesso Aluno Intensivo</h2>
        <form onSubmit={(e) => { e.preventDefault(); onLogin('intensive'); }} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300">Email ou CPF</label>
            <input type="text" required className="mt-1 block w-full bg-gray-800/50 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Senha</label>
            <input type="password" required className="mt-1 block w-full bg-gray-800/50 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
          </div>
          <button type="submit" className="w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-600 transition-all shadow-lg hover:shadow-teal-500/30 transform hover:-translate-y-1">Entrar</button>
        </form>
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


  const renderContent = () => {
    switch (mode) {
      case AccessMode.INTENSIVE_LOGIN:
        return renderIntensiveLogin();
      case AccessMode.EAD_HUB:
        return renderEadHub();
      case AccessMode.CHOICE:
      default:
        return renderChoice();
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-800 bg-cover bg-center p-4" style={{ backgroundImage: `url('https://gov.institutopaulistadecinema.com.br/galeria/11.jpg')` }}>
      <div className="absolute inset-0 bg-gray-900/70"></div>
      <div className="container mx-auto text-center text-white relative z-10">
        {renderContent()}
      </div>
    </section>
  );
};

export default AccessScreen;