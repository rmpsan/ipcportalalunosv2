import React from 'react';

const CalendarDay: React.FC<{ day: string; date: number; isToday?: boolean; hasEvent?: boolean, eventName?: string }> = ({ day, date, isToday, hasEvent, eventName }) => (
    <div className={`border border-gray-200 rounded-lg p-3 text-center ${isToday ? 'bg-teal-100' : 'bg-white'}`}>
        <p className="text-sm text-gray-500">{day}</p>
        <p className={`font-bold text-lg ${isToday ? 'text-teal-600' : 'text-gray-800'}`}>{date}</p>
        {hasEvent && (
            <div className="mt-2 text-xs bg-teal-500 text-white rounded-full px-2 py-1 cursor-pointer">
                {eventName}
            </div>
        )}
    </div>
);

const TrainingView: React.FC = () => {
    return (
        <div className="animate-[fadeInUp_0.5s_ease-out] space-y-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Agenda de Atividades e Suporte Integral</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Calendário Semanal</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <CalendarDay day="SEG" date={18} hasEvent eventName="Aula: Roteiro" />
                    <CalendarDay day="TER" date={19} hasEvent eventName="Prática: Fotografia" />
                    <CalendarDay day="QUA" date={20} isToday hasEvent eventName="Workshop: Edição" />
                    <CalendarDay day="QUI" date={21} />
                    <CalendarDay day="SEX" date={22} hasEvent eventName="Palestra: Mercado" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Workshops e Palestras</h2>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-center gap-3"><span className="font-bold text-teal-600">HOJE:</span> Workshop de Edição com Supervisor Convidado</li>
                        <li className="flex items-center gap-3"><span className="font-bold text-teal-600">SEX:</span> Palestra sobre o Futuro da IA no Cinema</li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Mentoria e Supervisão</h2>
                    <p className="text-gray-700 mb-4">Agende reuniões com seu Padrinho/Tutor e Supervisores para obter feedback e orientação personalizada.</p>
                    <button className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors">
                        Solicitar Reunião de Mentoria
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrainingView;
