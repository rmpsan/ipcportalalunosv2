import React, { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Target, Zap } from 'lucide-react';
import { AppView, ProfileData } from '../types';
import SkillsInfographic from './public_cv/SkillsInfographic';
import EditableField from './public_cv/EditableField';

interface PublicCvViewProps {
    onNavigate: (view: AppView) => void;
    profileData: ProfileData;
    setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
}

const PublicCvView: React.FC<PublicCvViewProps> = ({ onNavigate, profileData, setProfileData }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempProfileData, setTempProfileData] = useState(profileData);

    useEffect(() => {
        // Sync temp data if external profileData changes (e.g., new endorsement)
        setTempProfileData(profileData);
    }, [profileData]);

    const handleEditToggle = () => {
        if (isEditing) {
            // Cancel changes
            setTempProfileData(profileData);
        }
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        setProfileData(tempProfileData);
        setIsEditing(false);
    };

    const handleSkillChange = (index: number, level: number) => {
        const newSkills = [...tempProfileData.skills];
        newSkills[index].level = level;
        setTempProfileData({ ...tempProfileData, skills: newSkills });
    };

    const dataToShow = isEditing ? tempProfileData : profileData;

    return (
        <div className="bg-gray-900 min-h-screen text-white animate-[fadeInUp_0.5s_ease-out]">
            <div className="container mx-auto p-6 md:p-12">

                <div className="flex justify-end items-center gap-4 mb-8">
                    {isEditing && (
                         <button onClick={handleEditToggle} className="text-gray-400 font-bold py-2 px-6 rounded-lg hover:bg-gray-700 transition-all">
                            Cancelar
                        </button>
                    )}
                    {isEditing ? (
                         <button onClick={handleSave} className="bg-teal-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-600 transition-all">
                            Salvar Alterações
                        </button>
                    ) : (
                        <button onClick={handleEditToggle} className="bg-gray-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-600 transition-all">
                            Editar Perfil
                        </button>
                    )}
                     <button onClick={() => onNavigate(AppView.INTENSIVE_PORTAL)} className="text-gray-400 hover:text-white transition-all text-sm">
                        &larr; Voltar ao Portal
                    </button>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        
                        <div className="lg:col-span-1 flex flex-col items-center text-center">
                            <img src={dataToShow.avatar} alt={dataToShow.name} className="w-40 h-40 rounded-full shadow-lg border-4 border-gray-700" />
                            <h1 className="text-4xl font-extrabold mt-6">{dataToShow.name}</h1>
                            <EditableField as="input" isEditing={isEditing} value={dataToShow.title} onChange={val => setTempProfileData({...tempProfileData, title: val})} className="text-lg text-teal-400 mt-1" />
                            
                             <div className="my-8 w-full">
                                <h3 className="text-2xl font-bold text-left mb-4">Sobre</h3>
                                <EditableField as="textarea" isEditing={isEditing} value={dataToShow.bio} onChange={val => setTempProfileData({...tempProfileData, bio: val})} className="text-gray-400 text-left" />
                             </div>
                             
                            <div className="flex items-center gap-2 bg-teal-900/50 border border-teal-700 text-teal-300 text-sm font-semibold px-4 py-2 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                Verificado pelo IPC
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Infográfico de Competências</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div className="w-full h-80">
                                        <SkillsInfographic skills={dataToShow.skills} />
                                    </div>
                                    <div className="space-y-4">
                                    {isEditing ? (
                                        tempProfileData.skills.map((skill, index) => (
                                            <div key={skill.name}>
                                                <label className="block text-sm font-medium text-gray-300 mb-1">{skill.name}</label>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={skill.level}
                                                    onChange={(e) => handleSkillChange(index, parseInt(e.target.value))}
                                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-wrap gap-3">
                                            {dataToShow.skills.map(skill => (
                                                <span key={skill.name} className="bg-gray-700 text-gray-300 font-semibold px-4 py-2 rounded-full">{skill.name}</span>
                                            ))}
                                        </div>
                                    )}
                                    </div>
                                </div>
                            </div>
                            
                            {dataToShow.endorsements.length > 0 && <hr className="my-12 border-gray-700" />}

                            {/* Endorsements Section */}
                            {dataToShow.endorsements.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-6">Endossos do Instituto</h2>
                                    <div className="space-y-8">
                                        {dataToShow.endorsements.map(endorsement => (
                                            <div key={endorsement.id} className="bg-gray-700/50 p-6 rounded-lg border-l-4 border-teal-500">
                                                <p className="text-gray-300 italic">"{endorsement.text}"</p>
                                                <div className="flex items-center gap-3 mt-4">
                                                    <img src={endorsement.endorserAvatar} alt={endorsement.endorserName} className="w-12 h-12 rounded-full border-2 border-gray-600" />
                                                    <div>
                                                        <p className="font-bold text-white">{endorsement.endorserName}</p>
                                                        <p className="text-sm text-gray-400">{endorsement.endorserTitle}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <hr className="my-12 border-gray-700" />

                            {/* Gamification Section */}
                            {dataToShow.gameStats && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-6">Conquistas Acadêmicas</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-xl p-4">
                                            <div className="flex items-center space-x-3 mb-3">
                                                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                                                    <Trophy className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg">Nível {dataToShow.gameStats.level}</h3>
                                                    <p className="text-purple-300 text-sm">{dataToShow.gameStats.points} pontos</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                <div className="text-center">
                                                    <div className="font-bold text-lg">{dataToShow.gameStats.coursesCompleted}</div>
                                                    <div className="text-gray-400">Cursos</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="font-bold text-lg">{dataToShow.gameStats.projectsCompleted}</div>
                                                    <div className="text-gray-400">Projetos</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-r from-teal-600/20 to-green-600/20 border border-teal-500/30 rounded-xl p-4">
                                            <h3 className="font-bold mb-3 flex items-center">
                                                <TrendingUp className="w-5 h-5 mr-2" />
                                                Desempenho
                                            </h3>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-sm">Média Geral:</span>
                                                    <span className="font-bold text-teal-300">{dataToShow.gameStats.averageGrade}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm">Frequência:</span>
                                                    <span className="font-bold text-teal-300">{dataToShow.gameStats.attendanceRate}%</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm">Streak:</span>
                                                    <span className="font-bold text-yellow-300 flex items-center">
                                                        {dataToShow.gameStats.streak} dias <Zap className="w-4 h-4 ml-1" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="font-bold mb-3 flex items-center">
                                            <Trophy className="w-5 h-5 mr-2" />
                                            Badges Conquistadas
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {dataToShow.gameStats.badges.map(badge => (
                                                <div 
                                                    key={badge.id} 
                                                    className={`
                                                        border rounded-lg p-3 text-center transition-all hover:scale-105
                                                        ${badge.rarity === 'legendary' ? 'border-yellow-400 bg-yellow-400/10' :
                                                          badge.rarity === 'epic' ? 'border-purple-400 bg-purple-400/10' :
                                                          badge.rarity === 'rare' ? 'border-blue-400 bg-blue-400/10' :
                                                          'border-gray-400 bg-gray-400/10'}
                                                    `}
                                                    title={badge.description}
                                                >
                                                    <div className="text-2xl mb-1">
                                                        <badge.icon className="w-6 h-6 mx-auto" />
                                                    </div>
                                                    <div className="text-xs font-medium">{badge.name}</div>
                                                    {badge.earnedAt && (
                                                        <div className="text-xs text-gray-400 mt-1">
                                                            {new Date(badge.earnedAt).toLocaleDateString('pt-BR')}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-bold mb-3 flex items-center">
                                            <Target className="w-5 h-5 mr-2" />
                                            Progresso de Conquistas
                                        </h3>
                                        <div className="space-y-3">
                                            {dataToShow.gameStats.achievements.map(achievement => (
                                                <div key={achievement.id} className="bg-gray-700/30 rounded-lg p-3">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="font-medium">{achievement.title}</span>
                                                        <span className={`
                                                            px-2 py-1 rounded-full text-xs
                                                            ${achievement.category === 'academic' ? 'bg-blue-500/20 text-blue-300' :
                                                              achievement.category === 'project' ? 'bg-green-500/20 text-green-300' :
                                                              achievement.category === 'social' ? 'bg-pink-500/20 text-pink-300' :
                                                              'bg-purple-500/20 text-purple-300'}
                                                        `}>
                                                            {achievement.category}
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-600 rounded-full h-2 mb-1">
                                                        <div 
                                                            className="bg-teal-500 h-2 rounded-full transition-all duration-500" 
                                                            style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                    <div className="text-xs text-gray-400">
                                                        {achievement.progress}/{achievement.maxProgress} • +{achievement.reward} pts
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <hr className="my-12 border-gray-700" />

                            <div>
                                <h2 className="text-2xl font-bold mb-6">Projetos em Destaque</h2>
                                <div className="space-y-8">
                                    {dataToShow.projects.map(project => (
                                        <div key={project.id} className="flex flex-col md:flex-row gap-6 group">
                                            <img src={project.img} alt={project.title} className="w-full md:w-48 h-48 md:h-28 object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform" />
                                            <div>
                                                <h3 className="font-bold text-xl text-white">{project.title}</h3>
                                                <p className="text-gray-400 mt-1">{project.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="text-center mt-12 text-gray-500">
                    <p>Perfil gerado e validado pelo Instituto Paulista de Cinema.</p>
                </footer>
            </div>
        </div>
    );
};

export default PublicCvView;
