import React, { useState } from 'react';
import { TeacherView } from '../../types';
import { 
    MessageCircle, 
    Send, 
    Search, 
    Filter, 
    Users, 
    Clock, 
    CheckCircle,
    AlertCircle,
    Plus,
    Paperclip,
    Smile
} from 'lucide-react';

interface TeacherCommunicationViewProps {
    setActiveView: (view: TeacherView) => void;
}

// Mock data para conversas
const mockConversations = [
    {
        id: 1,
        student: { name: 'Ana Silva', avatar: '/api/placeholder/40/40', status: 'online' },
        lastMessage: 'Professora, tenho uma dúvida sobre o projeto final...',
        timestamp: '10:30',
        unread: 2,
        type: 'individual'
    },
    {
        id: 2,
        student: { name: 'Carlos Santos', avatar: '/api/placeholder/40/40', status: 'offline' },
        lastMessage: 'Obrigado pela explicação sobre iluminação!',
        timestamp: '09:15',
        unread: 0,
        type: 'individual'
    },
    {
        id: 3,
        student: { name: 'Turma A - Produção', avatar: '/api/placeholder/40/40', status: 'group' },
        lastMessage: 'Lembrete: Entrega do roteiro até sexta-feira',
        timestamp: 'Ontem',
        unread: 5,
        type: 'group'
    },
    {
        id: 4,
        student: { name: 'Marina Costa', avatar: '/api/placeholder/40/40', status: 'online' },
        lastMessage: 'Posso agendar uma mentoria individual?',
        timestamp: 'Ontem',
        unread: 1,
        type: 'individual'
    }
];

// Mock data para mensagens
const mockMessages = [
    {
        id: 1,
        sender: 'student',
        content: 'Professora, tenho uma dúvida sobre o projeto final. Como devo estruturar o roteiro?',
        timestamp: '10:25',
        read: true
    },
    {
        id: 2,
        sender: 'teacher',
        content: 'Olá Ana! Para o roteiro, você deve seguir a estrutura que vimos em aula: apresentação do conceito, desenvolvimento da narrativa e conclusão. Quer que eu envie o template?',
        timestamp: '10:27',
        read: true
    },
    {
        id: 3,
        sender: 'student',
        content: 'Sim, por favor! E sobre a duração do vídeo?',
        timestamp: '10:28',
        read: true
    },
    {
        id: 4,
        sender: 'teacher',
        content: 'O vídeo deve ter entre 3 a 5 minutos. Vou enviar o template agora.',
        timestamp: '10:30',
        read: false
    }
];

const TeacherCommunicationView: React.FC<TeacherCommunicationViewProps> = ({ setActiveView }) => {
    const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showNewMessageModal, setShowNewMessageModal] = useState(false);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            // Aqui seria implementada a lógica de envio
            console.log('Enviando mensagem:', newMessage);
            setNewMessage('');
        }
    };

    const filteredConversations = mockConversations.filter(conv =>
        conv.student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-full bg-white">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Comunicação</h1>
                        <p className="text-gray-600 mt-1">Converse com seus alunos e turmas</p>
                    </div>
                    <button
                        onClick={() => setShowNewMessageModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Nova Conversa
                    </button>
                </div>
            </div>

            <div className="flex h-[calc(100vh-200px)]">
                {/* Lista de Conversas */}
                <div className="w-1/3 border-r border-gray-200 bg-gray-50">
                    {/* Busca */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar conversas..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Lista */}
                    <div className="overflow-y-auto">
                        {filteredConversations.map((conversation) => (
                            <div
                                key={conversation.id}
                                onClick={() => setSelectedConversation(conversation)}
                                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-white transition-colors ${
                                    selectedConversation.id === conversation.id ? 'bg-white border-l-4 border-l-blue-500' : ''
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="relative">
                                        <img
                                            src={conversation.student.avatar}
                                            alt={conversation.student.name}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        {conversation.type === 'individual' && (
                                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                                                conversation.student.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                                            }`} />
                                        )}
                                        {conversation.type === 'group' && (
                                            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white bg-blue-500" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-medium text-gray-900 truncate">
                                                {conversation.student.name}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                                                {conversation.unread > 0 && (
                                                    <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                                                        {conversation.unread}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 truncate mt-1">
                                            {conversation.lastMessage}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Área de Chat */}
                <div className="flex-1 flex flex-col">
                    {/* Header do Chat */}
                    <div className="bg-white border-b border-gray-200 p-4">
                        <div className="flex items-center gap-3">
                            <img
                                src={selectedConversation.student.avatar}
                                alt={selectedConversation.student.name}
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <h2 className="font-medium text-gray-900">{selectedConversation.student.name}</h2>
                                <p className="text-sm text-gray-500">
                                    {selectedConversation.type === 'group' ? 'Grupo' : 
                                     selectedConversation.student.status === 'online' ? 'Online' : 'Offline'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Mensagens */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {mockMessages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'teacher' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                    message.sender === 'teacher'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-900'
                                }`}>
                                    <p className="text-sm">{message.content}</p>
                                    <p className={`text-xs mt-1 ${
                                        message.sender === 'teacher' ? 'text-blue-100' : 'text-gray-500'
                                    }`}>
                                        {message.timestamp}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input de Mensagem */}
                    <div className="bg-white border-t border-gray-200 p-4">
                        <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                <Paperclip className="w-5 h-5" />
                            </button>
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="Digite sua mensagem..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                <Smile className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleSendMessage}
                                disabled={!newMessage.trim()}
                                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Nova Conversa */}
            {showNewMessageModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Nova Conversa</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Selecionar Destinatário
                                </label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                    <option>Ana Silva</option>
                                    <option>Carlos Santos</option>
                                    <option>Marina Costa</option>
                                    <option>Turma A - Produção</option>
                                    <option>Turma B - Edição</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mensagem
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Digite sua mensagem..."
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setShowNewMessageModal(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => setShowNewMessageModal(false)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherCommunicationView;