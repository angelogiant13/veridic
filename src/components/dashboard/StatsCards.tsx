import { 
    DocumentTextIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

export default function StatsCards() {
    return (
        <div className="space-y-12">
            <div>
                <div className="text-gray-400 text-sm mb-1">Total Contracts</div>
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-4xl font-semibold text-white">156</div>
                        <div className="text-gray-500 text-sm mt-1">+12 this month</div>
                    </div>
                    <DocumentTextIcon className="h-6 w-6 text-emerald-500" />
                </div>
            </div>

            <div>
                <div className="text-gray-400 text-sm mb-1">High Risk Contracts</div>
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-4xl font-semibold text-white">8</div>
                        <div className="text-gray-500 text-sm mt-1">3 new this week</div>
                    </div>
                    <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />
                </div>
            </div>

            <div>
                <div className="text-gray-400 text-sm mb-1">Resolved Issues</div>
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-4xl font-semibold text-white">42</div>
                        <div className="text-gray-500 text-sm mt-1">85% resolution rate</div>
                    </div>
                    <CheckCircleIcon className="h-6 w-6 text-emerald-500" />
                </div>
            </div>

            <div>
                <div className="text-gray-400 text-sm mb-1">Pending Review</div>
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-4xl font-semibold text-white">15</div>
                        <div className="text-gray-500 text-sm mt-1">5 urgent items</div>
                    </div>
                    <ClockIcon className="h-6 w-6 text-blue-500" />
                </div>
            </div>
        </div>
    );
}
