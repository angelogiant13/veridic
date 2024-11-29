import { ReactNode } from 'react';

interface QuickActionButtonProps {
    icon: ReactNode;
    label: string;
}

export default function QuickActionButton({ icon, label }: QuickActionButtonProps) {
    return (
        <button className="flex flex-col items-center justify-center p-6 bg-[#1A1A1A] rounded-xl border border-[#232323] shadow-lg shadow-black/20 transition-all duration-200 hover:border-emerald-500/20 hover:shadow-emerald-500/5 hover-gradient group">
            <div className="text-emerald-500/80 mb-3 transition-transform duration-200 group-hover:scale-110">
                {icon}
            </div>
            <span className="text-emerald-500/90 text-sm font-medium">{label}</span>
        </button>
    );
}
