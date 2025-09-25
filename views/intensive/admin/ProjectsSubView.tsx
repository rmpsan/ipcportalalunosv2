import React from 'react';

const ProjectCard: React.FC<{ title: string; client: string; priority: 'High' | 'Medium' | 'Low' }> = ({ title, client, priority }) => {
    const priorityColor = {
        High: 'bg-red-500',
        Medium: 'bg-yellow-500',
        Low: 'bg-green-500',
    }[priority];

    return (
        <div className="bg-white p-4 rounded-md shadow border-l-4 border-teal-500 cursor-grab active:cursor-grabbing">
            <div className="flex justify-between items-start">
                <h4 className="font-bold text-gray-800">{title}</h4>
                <span className={`text-xs font-bold text-white px-2 py-0.5 rounded-full ${priorityColor}`}>{priority}</span>
            </div>
            <p className="text-sm text-gray-600">Cliente: {client}</p>
        </div>
    );
};


const ProjectsSubView: React.FC = () => {
    return (
        <div className="bg-gray-50 p-8 rounded-lg shadow-inner animate-[fadeInUp_0.4s_ease-out]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Gerenciamento de Projetos do Aluno</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Column: To Do */}
                <div className="bg-gray-200 p-4 rounded-lg">
                    <h3 className="font-bold text-lg mb-4 text-center text-gray-700">A Fazer</h3>
                    <div className="space-y-4">
                        <ProjectCard title="Vídeo Institucional" client="ONG Florescer" priority="Medium" />
                        <ProjectCard title="Animação para Redes Sociais" client="Startup Inova" priority="Low" />
                    </div>
                </div>
                {/* Column: In Progress */}
                 <div className="bg-gray-200 p-4 rounded-lg">
                    <h3 className="font-bold text-lg mb-4 text-center text-gray-700">Em Progresso</h3>
                    <div className="space-y-4">
                        <ProjectCard title="Campanha de Lançamento" client="TechCorp" priority="High" />
                        <ProjectCard title="Documentário Institucional" client="ONG Viver" priority="Medium" />
                    </div>
                </div>
                {/* Column: Completed */}
                 <div className="bg-gray-200 p-4 rounded-lg">
                    <h3 className="font-bold text-lg mb-4 text-center text-gray-700">Concluído</h3>
                    <div className="space-y-4 opacity-70">
                        <ProjectCard title="Comercial de TV" client="Varejo Total" priority="High" />
                        <ProjectCard title="Websérie Educacional" client="EducaMais" priority="Medium" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsSubView;