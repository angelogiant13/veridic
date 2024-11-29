import { 
    DocumentPlusIcon,
    SparklesIcon,
    ExclamationTriangleIcon,
    DocumentTextIcon,
    MagnifyingGlassCircleIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';

const QUICK_ACTIONS = [
    { title: 'Upload Contract', icon: DocumentPlusIcon },
    { title: 'AI Recommendations', icon: SparklesIcon },
    { title: 'Risk Analysis', icon: ExclamationTriangleIcon },
    { title: 'View Documents', icon: DocumentTextIcon },
    { title: 'Review Issues', icon: MagnifyingGlassCircleIcon },
    { title: 'Settings', icon: Cog6ToothIcon }
];

export default function QuickActions() {
    return (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {QUICK_ACTIONS.map(({ title, icon: Icon }) => (
                    <button
                        key={title}
                        className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 hover:bg-emerald-50 hover:border-emerald-200 transition-all duration-200"
                    >
                        <Icon className="h-6 w-6 mb-2 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">{title}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
