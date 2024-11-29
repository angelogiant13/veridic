import { ReactNode } from 'react';

interface QuickActionButtonProps {
    icon: ReactNode;
    label: string;
}

export default function QuickActionButton({ icon, label }: QuickActionButtonProps) {
    return (
        <button className="group relative flex flex-col items-center justify-center p-6 bg-[#1A1A1A] rounded-xl 
            border border-[#232323] shadow-lg shadow-black/20 transition-all duration-300 
            hover:border-emerald-500/20 hover:shadow-emerald-500/5 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex flex-col items-center">
                <div className="text-emerald-500/80 mb-3 transform transition-all duration-300 
                    group-hover:scale-110 group-hover:text-emerald-400">
                    {icon}
                </div>
                <span className="text-emerald-500/90 text-sm font-medium transition-colors duration-300 
                    group-hover:text-emerald-400">{label}</span>
            </div>
        </button>
    );
}
