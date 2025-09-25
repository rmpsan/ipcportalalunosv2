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
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo</label>
                                <input 
                                    type="text" 
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-teal-500 focus:border-transparent touch-manipulation" 
                                    placeholder="Digite o nome completo"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                <input 
                                    type="email" 
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-teal-500 focus:border-transparent touch-manipulation" 
                                    placeholder="email@exemplo.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone</label>
                                <input 
                                    type="tel" 
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-teal-500 focus:border-transparent touch-manipulation" 
                                    placeholder="(11) 99999-9999"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Data de Nascimento</label>
                                <input 
                                    type="date" 
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-teal-500 focus:border-transparent touch-manipulation" 
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Endereço</label>
                                <input 
                                    type="text" 
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-teal-500 focus:border-transparent touch-manipulation" 
                                    placeholder="Rua, número, bairro"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Cidade</label>
                                <input 
                                    type="text" 
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-teal-500 focus:border-transparent touch-manipulation" 
                                    placeholder="Nome da cidade"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
                                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-teal-500 focus:border-transparent touch-manipulation">
                                    <option value="">Selecione o estado</option>
                                    <option value="SP">São Paulo</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="MG">Minas Gerais</option>
                                    <option value="RS">Rio Grande do Sul</option>
                                    <option value="PR">Paraná</option>
                                    <option value="SC">Santa Catarina</option>
                                    <option value="BA">Bahia</option>
                                    <option value="GO">Goiás</option>
                                    <option value="PE">Pernambuco</option>
                                    <option value="CE">Ceará</option>
                                    <option value="PA">Pará</option>
                                    <option value="MA">Maranhão</option>
                                    <option value="PB">Paraíba</option>
                                    <option value="ES">Espírito Santo</option>
                                    <option value="PI">Piauí</option>
                                    <option value="AL">Alagoas</option>
                                    <option value="RN">Rio Grande do Norte</option>
                                    <option value="MT">Mato Grosso</option>
                                    <option value="MS">Mato Grosso do Sul</option>
                                    <option value="DF">Distrito Federal</option>
                                    <option value="SE">Sergipe</option>
                                    <option value="AM">Amazonas</option>
                                    <option value="RO">Rondônia</option>
                                    <option value="AC">Acre</option>
                                    <option value="RR">Roraima</option>
                                    <option value="TO">Tocantins</option>
                                    <option value="AP">Amapá</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
                            <button 
                                type="button"
                                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-base touch-manipulation"
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit"
                                className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-base touch-manipulation"
                            >
                                Salvar Dados
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};

export default StudentDataSubView;