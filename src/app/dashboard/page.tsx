'use client';

import { 
    MagnifyingGlassIcon, 
    ArrowLeftIcon, 
    QuestionMarkCircleIcon,
    ClockIcon,
    DocumentTextIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon,
    ArrowUpTrayIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-[#0A1628] p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <ArrowLeftIcon className="h-5 w-5 text-gray-400" />
                    <div>
                        <h1 className="text-xl text-white">
                            Welcome back, <span className="text-emerald-500">Angelo</span>
                        </h1>
                        <p className="text-gray-400 text-sm">Your contract insights and actions are just a click away.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center text-gray-400 text-sm">
                        <ClockIcon className="h-4 w-4 mr-2" />
                        Last login: 1 day ago
                    </div>
                    <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400" />
                </div>
            </div>

            {/* Search */}
            <div className="relative mb-12">
                <MagnifyingGlassIcon className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search contracts, analyses, or flagged issues..."
                    className="w-full bg-white/5 text-gray-100 pl-12 pr-4 py-2.5 rounded-lg"
                />
            </div>

            {/* Stats */}
            <div className="space-y-12 mb-16">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-gray-400 text-sm mb-1">Total Contracts</div>
                        <div className="text-white text-4xl font-semibold">156</div>
                        <div className="text-gray-500 text-sm mt-1">+12 this month</div>
                    </div>
                    <DocumentTextIcon className="h-6 w-6 text-emerald-500" />
                </div>

                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-gray-400 text-sm mb-1">High Risk Contracts</div>
                        <div className="text-white text-4xl font-semibold">8</div>
                        <div className="text-gray-500 text-sm mt-1">3 new this week</div>
                    </div>
                    <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />
                </div>

                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-gray-400 text-sm mb-1">Resolved Issues</div>
                        <div className="text-white text-4xl font-semibold">42</div>
                        <div className="text-gray-500 text-sm mt-1">85% resolution rate</div>
                    </div>
                    <CheckCircleIcon className="h-6 w-6 text-emerald-500" />
                </div>

                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-gray-400 text-sm mb-1">Pending Review</div>
                        <div className="text-white text-4xl font-semibold">15</div>
                        <div className="text-gray-500 text-sm mt-1">5 urgent items</div>
                    </div>
                    <ClockIcon className="h-6 w-6 text-blue-500" />
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-white text-xl mb-8">Quick Actions</h2>
                <div className="flex flex-col items-end gap-8">
                    <div className="flex items-center gap-2 text-emerald-500">
                        <ArrowUpTrayIcon className="h-5 w-5" />
                        <span>Upload Contract</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-500">
                        <SparklesIcon className="h-5 w-5" />
                        <span>AI Recommendations</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
