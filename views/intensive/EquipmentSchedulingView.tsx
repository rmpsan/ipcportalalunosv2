import React, { useState, useMemo } from 'react';
import { IntensiveView } from '../../types';

interface EquipmentSchedulingViewProps {
    setActiveView: (view: IntensiveView) => void;
}

const timeSlots = ["Manhã (8h-12h)", "Tarde (13h-17h)", "Noite (18h-22h)", "Dia Inteiro"];

const equipmentData = [
    { category: 'Câmeras', items: ['Câmera Blackmagic 6K Pro', 'Câmera Sony FX3', 'Kit de Lentes Prime'] },
    { category: 'Iluminação', items: ['Kit de Iluminação Aputure 300D', 'Painel de LED Bicolor', 'Refletores e Difusores'] },
    { category: 'Áudio', items: ['Gravador Zoom H6', 'Microfone Boom Sennheiser', 'Kit de Microfones de Lapela'] },
    { category: 'Estúdios', items: ['Estúdio de Gravação (Chroma Key)', 'Estúdio de Podcast'] },
];

const EquipmentSchedulingView: React.FC<EquipmentSchedulingViewProps> = ({ setActiveView }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

    const calendarGrid = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        const grid = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            grid.push(<div key={`empty-${i}`} className="border rounded-md p-2"></div>);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isSelected = selectedDate?.toDateString() === date.toDateString();
            const isToday = new Date().toDateString() === date.toDateString();
            grid.push(
                <button 
                    key={day} 
                    onClick={() => setSelectedDate(date)}
                    className={`border rounded-md p-2 text-center transition-colors duration-200 ${
                        isSelected ? 'bg-teal-600 text-white' : 
                        isToday ? 'bg-teal-100' : 'bg-white hover:bg-gray-100'
                    }`}
                >
                    {day}
                </button>
            );
        }
        return grid;
    }, [currentDate, selectedDate]);

    const handleEquipmentToggle = (item: string) => {
        setSelectedEquipment(prev => 
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    };

    return (
        <div className="animate-[fadeInUp_0.5s_ease-out] space-y-8">
            <div>
                 <button onClick={() => setActiveView(IntensiveView.PRODUCAO)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 font-semibold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Voltar para Produção
                </button>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Agendamento de Equipamentos</h1>
            </div>

            <div className="lg:flex lg:gap-8">
                {/* Main Content: Calendar and Selections */}
                <div className="lg:w-2/3 space-y-6">
                    {/* Calendar */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                             <button onClick={() => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))} className="p-2 rounded-full hover:bg-gray-100">&lt;</button>
                            <h2 className="text-xl font-bold">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                             <button onClick={() => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))} className="p-2 rounded-full hover:bg-gray-100">&gt;</button>
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                             {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => <div key={day} className="text-center font-semibold text-sm text-gray-500">{day}</div>)}
                             {calendarGrid}
                        </div>
                    </div>
                    
                    {selectedDate && (
                    <>
                        {/* Time Slot Selection */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-lg font-bold mb-4">Selecione um Horário</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {timeSlots.map(slot => (
                                    <button 
                                        key={slot} 
                                        onClick={() => setSelectedTime(slot)}
                                        className={`p-3 rounded-md text-sm font-semibold transition-colors ${selectedTime === slot ? 'bg-teal-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Equipment Selection */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                             <h3 className="text-lg font-bold mb-4">Selecione os Equipamentos</h3>
                             <div className="space-y-4">
                                 {equipmentData.map(cat => (
                                     <div key={cat.category}>
                                         <h4 className="font-semibold border-b pb-1 mb-2">{cat.category}</h4>
                                         <div className="space-y-2">
                                            {cat.items.map(item => (
                                                <label key={item} className="flex items-center gap-3 cursor-pointer">
                                                    <input 
                                                        type="checkbox"
                                                        checked={selectedEquipment.includes(item)}
                                                        onChange={() => handleEquipmentToggle(item)}
                                                        className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                                                    />
                                                    <span className="text-gray-700">{item}</span>
                                                </label>
                                            ))}
                                         </div>
                                     </div>
                                 ))}
                             </div>
                        </div>
                    </>
                    )}
                </div>
                
                {/* Sidebar: Summary */}
                <div className="lg:w-1/3 mt-8 lg:mt-0">
                     <div className="bg-white p-6 rounded-lg shadow-lg sticky top-28">
                         <h2 className="text-2xl font-bold mb-4 border-b pb-2">Resumo do Agendamento</h2>
                         <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-gray-500">Data</h4>
                                <p className="text-lg">{selectedDate ? selectedDate.toLocaleDateString('pt-BR') : 'Nenhuma'}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-500">Horário</h4>
                                <p className="text-lg">{selectedTime || 'Nenhum'}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-500">Equipamentos</h4>
                                {selectedEquipment.length > 0 ? (
                                    <ul className="list-disc list-inside text-gray-700">
                                        {selectedEquipment.map(item => <li key={item}>{item}</li>)}
                                    </ul>
                                ) : <p>Nenhum</p>}
                            </div>
                            <button className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-400" disabled={!selectedDate || !selectedTime || selectedEquipment.length === 0}>
                                Confirmar Agendamento
                            </button>
                         </div>
                    </div>
                </div>
            </div>

            {/* My Reservations */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Meus Agendamentos</h2>
                <div className="space-y-3">
                    <div className="border p-3 rounded-md flex justify-between items-center">
                        <div>
                            <p className="font-semibold">25/07/2024 - Tarde</p>
                            <p className="text-sm text-gray-600">Câmera Blackmagic 6K Pro, Kit de Lentes</p>
                        </div>
                        <span className="text-sm font-bold text-green-600">Confirmado</span>
                    </div>
                     <div className="border p-3 rounded-md flex justify-between items-center">
                        <div>
                            <p className="font-semibold">28/07/2024 - Manhã</p>
                            <p className="text-sm text-gray-600">Estúdio de Gravação (Chroma Key)</p>
                        </div>
                        <span className="text-sm font-bold text-green-600">Confirmado</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EquipmentSchedulingView;