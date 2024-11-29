import { DocumentTextIcon, ExclamationTriangleIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

interface StatCardProps {
    title: string;
    value: number;
    subtitle: string;
    icon: 'document' | 'warning' | 'check' | 'clock';
}

const getIcon = (icon: string) => {
    switch (icon) {
        case 'document':
            return <DocumentTextIcon className="h-6 w-6 text-emerald-500" />;
        case 'warning':
            return <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />;
        case 'check':
            return <CheckCircleIcon className="h-6 w-6 text-emerald-500" />;
        case 'clock':
            return <ClockIcon className="h-6 w-6 text-blue-500" />;
        default:
            return null;
    }
};

export default function StatCard({ title, value, subtitle, icon }: StatCardProps) {
    return (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-gray-400 text-sm">{title}</h3>
                    <p className="text-3xl font-semibold mt-2 text-white">{value}</p>
                    <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
                </div>
                <div className="bg-gray-700/50 p-3 rounded-lg">
                    {getIcon(icon)}
                </div>
            </div>
        </div>
    );
}
