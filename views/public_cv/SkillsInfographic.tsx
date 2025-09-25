import React, { useMemo } from 'react';

interface Skill {
    name: string;
    level: number;
}

interface SkillsInfographicProps {
    skills: Skill[];
}

const SkillsInfographic: React.FC<SkillsInfographicProps> = ({ skills }) => {

    const chartData = useMemo(() => {
        const numAxes = skills.length;
        const angleSlice = (Math.PI * 2) / numAxes;
        const center = 150;
        const radius = 120;

        const points = skills.map((skill, i) => {
            const angle = angleSlice * i - Math.PI / 2;
            const x = center + radius * (skill.level / 100) * Math.cos(angle);
            const y = center + radius * (skill.level / 100) * Math.sin(angle);
            return `${x},${y}`;
        }).join(' ');

        const axes = skills.map((skill, i) => {
            const angle = angleSlice * i - Math.PI / 2;
            const x1 = center;
            const y1 = center;
            const x2 = center + radius * Math.cos(angle);
            const y2 = center + radius * Math.sin(angle);
            const labelX = center + (radius + 20) * Math.cos(angle);
            const labelY = center + (radius + 20) * Math.sin(angle);
            return {
                line: { x1, y1, x2, y2 },
                label: { x: labelX, y: labelY, text: skill.name }
            };
        });
        
        const gridLevels = [25, 50, 75, 100].map(level => {
            return skills.map((_, i) => {
                const angle = angleSlice * i - Math.PI / 2;
                const x = center + radius * (level / 100) * Math.cos(angle);
                const y = center + radius * (level / 100) * Math.sin(angle);
                return `${x},${y}`;
            }).join(' ');
        });

        return { points, axes, gridLevels };
    }, [skills]);

    return (
        <svg viewBox="0 0 300 300" className="w-full h-full">
            <g>
                {/* Grid Levels */}
                {chartData.gridLevels.reverse().map((points, i) => (
                    <polygon
                        key={i}
                        points={points}
                        className="fill-gray-700/50 stroke-gray-600"
                        strokeWidth="1"
                    />
                ))}
                
                {/* Axes Lines */}
                {chartData.axes.map((axis, i) => (
                    <line key={i} {...axis.line} className="stroke-gray-600" strokeWidth="1" />
                ))}

                {/* Data Polygon */}
                <polygon
                    points={chartData.points}
                    className="fill-teal-500/30 stroke-teal-400"
                    strokeWidth="2"
                    style={{ transition: 'all 0.3s ease-in-out' }}
                />

                {/* Data Points */}
                 {chartData.points.split(' ').map((p, i) => {
                    const [x, y] = p.split(',');
                    return <circle key={i} cx={x} cy={y} r="4" className="fill-teal-400" />
                 })}


                {/* Labels */}
                {chartData.axes.map((axis, i) => (
                    <text
                        key={i}
                        x={axis.label.x}
                        y={axis.label.y}
                        className="fill-gray-400 text-xs font-semibold"
                        textAnchor={axis.label.x < 150 ? 'end' : axis.label.x > 150 ? 'start' : 'middle'}
                        dominantBaseline="middle"
                    >
                        {axis.label.text}
                    </text>
                ))}
            </g>
        </svg>
    );
};

export default SkillsInfographic;
