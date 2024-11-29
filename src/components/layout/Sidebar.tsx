import { HomeIcon, ChartBarIcon, ShieldExclamationIcon, DocumentTextIcon, LightBulbIcon, ClockIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function Sidebar() {
    return (
        <aside className="w-64 bg-gray-900 min-h-screen p-6 border-r border-gray-800">
            <div className="flex items-center space-x-2 mb-8">
                <div className="h-8 w-8 bg-emerald-500/20 p-1.5 rounded-lg">
                    <ShieldExclamationIcon className="h-full w-full text-emerald-500" />
                </div>
                <div>
                    <div className="flex items-baseline">
                        <span className="text-lg font-semibold text-gray-200">cypher</span>
                        <span className="text-lg font-semibold text-emerald-500">Ai</span>
                    </div>
                    <p className="text-xs text-gray-400">Contract Intelligence</p>
                </div>
            </div>

            <nav className="space-y-8">
                <div>
                    <p className="text-xs text-gray-500 uppercase mb-4">OVERVIEW</p>
                    <div className="space-y-1">
                        <a href="#" className="flex items-center space-x-3 px-4 py-2.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                            <HomeIcon className="h-5 w-5" />
                            <span className="font-medium">Dashboard</span>
                        </a>
                    </div>
                </div>

                <div>
                    <p className="text-xs text-gray-500 uppercase mb-4">ANALYTICS</p>
                    <div className="space-y-1">
                        <a href="#" className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800">
                            <ChartBarIcon className="h-5 w-5" />
                            <span>Analytics</span>
                        </a>
                        <a href="#" className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800">
                            <ShieldExclamationIcon className="h-5 w-5" />
                            <span>Risk Analysis</span>
                        </a>
                    </div>
                </div>

                <div>
                    <p className="text-xs text-gray-500 uppercase mb-4">DOCUMENTS</p>
                    <div className="space-y-1">
                        <a href="#" className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800">
                            <DocumentTextIcon className="h-5 w-5" />
                            <span>Documents</span>
                        </a>
                    </div>
                </div>

                <div>
                    <p className="text-xs text-gray-500 uppercase mb-4">AI TOOLS</p>
                    <div className="space-y-1">
                        <a href="#" className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800">
                            <LightBulbIcon className="h-5 w-5" />
                            <span>AI Analysis</span>
                        </a>
                    </div>
                </div>

                <div>
                    <p className="text-xs text-gray-500 uppercase mb-4">HISTORY</p>
                    <div className="space-y-1">
                        <a href="#" className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800">
                            <ClockIcon className="h-5 w-5" />
                            <span>Audit History</span>
                        </a>
                    </div>
                </div>

                <div>
                    <p className="text-xs text-gray-500 uppercase mb-4">SYSTEM</p>
                    <div className="space-y-1">
                        <a href="#" className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800">
                            <Cog6ToothIcon className="h-5 w-5" />
                            <span>Settings</span>
                        </a>
                        <a href="#" className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800">
                            <ArrowRightOnRectangleIcon className="h-5 w-5" />
                            <span>Logout</span>
                        </a>
                    </div>
                </div>
            </nav>
        </aside>
    );
}
