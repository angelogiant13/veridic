'use client';

import { 
    HomeIcon,
    ChartBarIcon,
    ShieldExclamationIcon,
    DocumentTextIcon,
    BeakerIcon,
    ClockIcon,
    Cog6ToothIcon,
    ArrowLeftIcon,
    QuestionMarkCircleIcon,
    MagnifyingGlassIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    ArrowUpTrayIcon,
    SparklesIcon,
    DocumentDuplicateIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline';
import StatsCard from '../../components/dashboard/StatsCard';
import QuickActionButton from '../../components/dashboard/QuickActionButton';

export default function DashboardPage() {
    return (
        <div className="flex h-screen bg-[#121212] bg-dot-pattern">
            {/* Sidebar */}
            <aside className="w-72 bg-[#1A1A1A] border-r border-[#232323] shadow-xl shadow-black/20">
                {/* Logo */}
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-emerald-500/10 p-2 rounded-lg">
                            <span className="text-emerald-500 font-semibold text-lg">cy</span>
                        </div>
                        <div>
                            <div className="text-lg font-semibold tracking-tight">cypherAi</div>
                            <div className="text-xs text-gray-400 font-medium">Contract Intelligence</div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-1.5 px-4">
                    <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-emerald-500 bg-[#202020] font-medium rounded-lg">
                        <HomeIcon className="h-5 w-5" />
                        <span>Dashboard</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-400 font-medium transition-all duration-200 hover:text-emerald-500 hover:bg-[#202020] rounded-lg group">
                        <ChartBarIcon className="h-5 w-5 group-hover:text-emerald-500" />
                        <span>Analytics</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-400 font-medium transition-all duration-200 hover:text-emerald-500 hover:bg-[#202020] rounded-lg group">
                        <ShieldExclamationIcon className="h-5 w-5 group-hover:text-emerald-500" />
                        <span>Risk Analysis</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-400 font-medium transition-all duration-200 hover:text-emerald-500 hover:bg-[#202020] rounded-lg group">
                        <DocumentTextIcon className="h-5 w-5 group-hover:text-emerald-500" />
                        <span>Documents</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-400 font-medium transition-all duration-200 hover:text-emerald-500 hover:bg-[#202020] rounded-lg group">
                        <BeakerIcon className="h-5 w-5 group-hover:text-emerald-500" />
                        <span>AI Analysis</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-400 font-medium transition-all duration-200 hover:text-emerald-500 hover:bg-[#202020] rounded-lg group">
                        <ClockIcon className="h-5 w-5 group-hover:text-emerald-500" />
                        <span>Audit History</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-400 font-medium transition-all duration-200 hover:text-emerald-500 hover:bg-[#202020] rounded-lg group">
                        <Cog6ToothIcon className="h-5 w-5 group-hover:text-emerald-500" />
                        <span>Settings</span>
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-[#121212] overflow-y-auto">
                <div className="max-w-7xl mx-auto p-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex items-center gap-4">
                            <button className="p-2 hover:bg-[#202020] rounded-lg transition-colors">
                                <ArrowLeftIcon className="h-5 w-5 text-gray-400" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight text-white">
                                    Welcome back, <span className="text-emerald-500">Angelo</span>
                                </h1>
                                <p className="text-gray-400 font-medium mt-1">Your contract insights and actions are just a click away.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center text-gray-400 font-medium">
                                <ClockIcon className="h-4 w-4 mr-2 opacity-70" />
                                Last login: 1 day ago
                            </div>
                            <button className="p-2 hover:bg-[#202020] rounded-lg transition-colors">
                                <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400" />
                            </button>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative mb-12">
                        <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search contracts, analyses, or flagged issues..."
                            className="w-full bg-[#202020] text-gray-100 pl-12 pr-4 py-3.5 rounded-xl border border-[#232323] shadow-lg shadow-black/20 transition-all duration-200 placeholder:text-gray-500 focus:outline-none focus:border-emerald-500/30 focus:ring-1 focus:ring-emerald-500/30"
                        />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-6 mb-12">
                        <StatsCard
                            title="Total Contracts"
                            value="156"
                            subtitle="+12 this month"
                            icon={<DocumentTextIcon className="h-6 w-6" />}
                        />
                        <StatsCard
                            title="High Risk Contracts"
                            value="8"
                            subtitle="3 new this week"
                            icon={<ExclamationTriangleIcon className="h-6 w-6" />}
                        />
                        <StatsCard
                            title="Resolved Issues"
                            value="42"
                            subtitle="85% resolution rate"
                            icon={<CheckCircleIcon className="h-6 w-6" />}
                        />
                        <StatsCard
                            title="Pending Review"
                            value="15"
                            subtitle="5 urgent items"
                            icon={<ClockIcon className="h-6 w-6" />}
                        />
                    </div>

                    {/* Quick Actions */}
                    <div className="mb-12">
                        <h2 className="text-xl font-semibold tracking-tight text-white mb-6">Quick Actions</h2>
                        <div className="grid grid-cols-6 gap-4">
                            <QuickActionButton
                                icon={<ArrowUpTrayIcon className="h-6 w-6" />}
                                label="Upload Contract"
                            />
                            <QuickActionButton
                                icon={<SparklesIcon className="h-6 w-6" />}
                                label="AI Recommendations"
                            />
                            <QuickActionButton
                                icon={<ShieldExclamationIcon className="h-6 w-6" />}
                                label="Risk Analysis"
                            />
                            <QuickActionButton
                                icon={<DocumentDuplicateIcon className="h-6 w-6" />}
                                label="View Documents"
                            />
                            <QuickActionButton
                                icon={<ShieldCheckIcon className="h-6 w-6" />}
                                label="Review Issues"
                            />
                            <QuickActionButton
                                icon={<Cog6ToothIcon className="h-6 w-6" />}
                                label="Settings"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}