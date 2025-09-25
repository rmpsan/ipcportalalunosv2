import React, { useState } from 'react';

const StudentDataSubView: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg animate-[fadeInUp_0.4s_ease-out]">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Dados Cadastrais do Aluno</h2>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`font-semibold py-2 px-4 rounded-md transition-colors ${
                        isEditing ? 'bg-gray-200 text-gray-800' : 'bg-teal-600 text-white'
                    }`}
                >
                    {isEditing ? 'Cancelar' : 'Editar Dados'}
                </button>
            </div>
            <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                        <input type="text" defaultValue="Aluno Exemplo da Silva" disabled={!isEditing} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 disabled:bg-gray-100" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" defaultValue="aluno.exemplo@email.com" disabled={!isEditing} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 disabled:bg-gray-100" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Telefone</label>
                        <input type="tel" defaultValue="(11) 99999-8888" disabled={!isEditing} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 disabled:bg-gray-100" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cidade/Estado</label>
                        <input type="text" defaultValue="São Paulo, SP" disabled={!isEditing} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 disabled:bg-gray-100" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Trilha de Especialização</label>
                        <select disabled={!isEditing} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 disabled:bg-gray-100">
                            <option>IA Audiovisual</option>
                            <option>Direção de Fotografia</option>
                            <option>Roteiro</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Status do Aluno</label>
                        <select disabled={!isEditing} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 disabled:bg-gray-100">
                            <option>Ativo</option>
                            <option>Formado</option>
                            <option>Inativo</option>
                        </select>
                    </div>
                </div>
                {isEditing && (
                    <div className="mt-6 text-right">
                        <button type="submit" className="bg-teal-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-teal-700 transition-colors">
                            Salvar Alterações
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default StudentDataSubView;