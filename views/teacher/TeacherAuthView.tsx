import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, GraduationCap, Shield } from 'lucide-react';

interface TeacherAuthViewProps {
    onLogin: (credentials: { email: string; password: string; userType: 'teacher' }) => void;
    onBackToMain: () => void;
}

const TeacherAuthView: React.FC<TeacherAuthViewProps> = ({ onLogin, onBackToMain }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Validação básica
        if (!email || !password) {
            setError('Por favor, preencha todos os campos');
            setIsLoading(false);
            return;
        }

        if (!email.includes('@')) {
            setError('Por favor, insira um email válido');
            setIsLoading(false);
            return;
        }

        try {
            // Simular autenticação (substituir por lógica real)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Credenciais de demonstração
            if (email === 'professor@ipc.com' && password === 'professor123') {
                onLogin({ email, password, userType: 'teacher' });
            } else {
                setError('Credenciais inválidas. Use: professor@ipc.com / professor123');
            }
        } catch (err) {
            setError('Erro ao fazer login. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                        <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Portal do Professor</h1>
                    <p className="text-blue-100">Instituto de Produção Cinematográfica</p>
                </div>

                {/* Login Form */}
                <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white border-opacity-20">
                    <div className="flex items-center gap-2 mb-6">
                        <Shield className="w-5 h-5 text-blue-200" />
                        <h2 className="text-xl font-semibold text-white">Acesso Restrito</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-2">
                                Email Institucional
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                    placeholder="seu.email@ipc.com"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-blue-100 mb-2">
                                Senha
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-12 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
                                    disabled={isLoading}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500 bg-opacity-20 border border-red-400 border-opacity-30 rounded-lg p-3">
                                <p className="text-red-200 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Demo Credentials */}
                        <div className="bg-blue-500 bg-opacity-20 border border-blue-400 border-opacity-30 rounded-lg p-3">
                            <p className="text-blue-200 text-sm font-medium mb-1">Credenciais de Demonstração:</p>
                            <p className="text-blue-100 text-xs">Email: professor@ipc.com</p>
                            <p className="text-blue-100 text-xs">Senha: professor123</p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Entrando...
                                </div>
                            ) : (
                                'Entrar no Portal'
                            )}
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-6 text-center space-y-2">
                        <button
                            onClick={onBackToMain}
                            className="text-blue-200 hover:text-white text-sm transition-colors"
                        >
                            ← Voltar ao Portal Principal
                        </button>
                        <div className="text-blue-300 text-xs">
                            <p>Problemas com acesso? Entre em contato com a coordenação.</p>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 text-center">
                    <p className="text-blue-200 text-sm">
                        Portal exclusivo para professores, tutores, coordenadores e palestrantes
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TeacherAuthView;