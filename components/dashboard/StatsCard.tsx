import { ReactNode } from 'react';

interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle: string;
    icon: ReactNode;
}

export default function StatsCard({ title, value, subtitle, icon }: StatsCardProps) {
    return (
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#232323] shadow-lg shadow-black/20 transition-all duration-200 hover:border-[#2A2A2A] hover:shadow-xl hover:shadow-black/30">
            <div className="flex justify-between items-start">
                <div>
                    <div className="text-gray-400 font-medium mb-1">{title}</div>
                    <div className="text-3xl font-semibold text-white tracking-tight">{value}</div>
                    <div className="text-gray-500 text-sm mt-2 font-medium">{subtitle}</div>
                </div>
                <div className="text-emerald-500/90 bg-emerald-500/10 p-2 rounded-lg">
                    {icon}
                </div>
            </div>
        </div>
    );
}
