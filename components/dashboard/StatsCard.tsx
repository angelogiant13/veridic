import { ReactNode } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';

interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle: string;
    icon: ReactNode;
    isLoading?: boolean;
    error?: string;
}

export default function StatsCard({ 
    title, 
    value, 
    subtitle, 
    icon, 
    isLoading = false,
    error
}: StatsCardProps) {
    return (
        <div className="group bg-[#1A1A1A] p-6 rounded-xl border border-[#232323] shadow-lg shadow-black/20 
            transition-all duration-300 hover:border-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/5
            hover:scale-[1.02] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
                {isLoading ? (
                    <LoadingSpinner />
                ) : error ? (
                    <div className="text-red-500 text-sm">{error}</div>
                ) : (
                    <>
                        <div className="text-gray-400 font-medium mb-1">{title}</div>
                        <div className="text-4xl font-bold text-white tracking-tight stats-value">{value}</div>
                        <div className="text-gray-500 text-sm mt-2 font-medium">{subtitle}</div>
                    </>
                )}
            </div>
            <div className="absolute top-4 right-4 text-emerald-500/90 bg-emerald-500/10 p-2 rounded-lg
                transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                {icon}
            </div>
        </div>
    );
}
