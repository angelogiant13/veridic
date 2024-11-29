import { MagnifyingGlassIcon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

export default function Header() {
    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Welcome back, User</h1>
                        <p className="mt-2 text-gray-600">Your contract insights and actions are just a click away.</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search contracts, analyses, or flagged issues..."
                                className="w-96 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                            />
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                        </div>
                        <button className="p-2 rounded-full hover:bg-gray-100">
                            <BellIcon className="h-6 w-6 text-gray-500" />
                        </button>
                        <div className="flex items-center space-x-2">
                            <UserCircleIcon className="h-8 w-8 text-gray-500" />
                            <span className="text-sm text-gray-500">
                                Last login: {format(new Date(), 'MMM d, yyyy')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
