import { Notification } from '@/types/dashboard';
import { 
    BellIcon, 
    ExclamationCircleIcon,
    CheckCircleIcon,
    ArrowUpTrayIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';

interface NotificationPanelProps {
    notifications: Notification[];
}

const getNotificationIcon = (type: string) => {
    switch (type) {
        case 'risk':
            return <ExclamationCircleIcon className="h-5 w-5 text-red-500" />;
        case 'update':
            return <CheckCircleIcon className="h-5 w-5 text-emerald-500" />;
        case 'upload':
            return <ArrowUpTrayIcon className="h-5 w-5 text-blue-500" />;
        default:
            return <BellIcon className="h-5 w-5 text-gray-500" />;
    }
};

export default function NotificationPanel({ notifications }: NotificationPanelProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-700">Notifications</h2>
                <span className="text-sm text-gray-500">{notifications.length} new</span>
            </div>
            {notifications.length === 0 ? (
                <div className="text-center py-8">
                    <BellIcon className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-500">No notifications available.</p>
                </div>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {notifications.map((notification) => (
                        <li key={notification.id} className="py-4 hover:bg-gray-50 cursor-pointer">
                            <div className="flex items-center space-x-3">
                                {getNotificationIcon(notification.type)}
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900">{notification.message}</p>
                                    <p className="text-xs text-gray-500">
                                        {format(new Date(notification.timestamp), 'MMM d, h:mm a')}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <button className="mt-4 w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                View All Notifications
            </button>
        </div>
    );
}
