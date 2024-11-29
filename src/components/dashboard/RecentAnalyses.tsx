import { Analysis } from '@/types/dashboard';
import { CalendarIcon, ChartBarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

interface RecentAnalysesProps {
    analyses: Analysis[];
}

export default function RecentAnalyses({ analyses }: RecentAnalysesProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Recent Analyses</h2>
            {analyses.length === 0 ? (
                <div className="text-center py-8">
                    <DocumentTextIcon className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-500">No analyses available. Upload a contract to get started!</p>
                </div>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {analyses.map((analysis) => (
                        <li key={analysis.id} className="py-4 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors">
                            <div className="flex items-center justify-between px-4">
                                <div className="flex items-center space-x-3">
                                    <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="font-medium text-gray-900">{analysis.documentName}</p>
                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <CalendarIcon className="h-4 w-4" />
                                            <span>{format(new Date(analysis.date), 'MMM d, yyyy')}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <ChartBarIcon className="h-5 w-5 text-emerald-500" />
                                    <span className="text-emerald-500 font-medium">{analysis.riskScore}/100</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
