import { FileUpload } from '../components/FileUpload'
import { FileListTable } from '../components/FileListTable'

export default function Dashboard() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome back, <span className="text-emerald-400">Angelo</span>
          </h1>
          <p className="text-gray-400">Your contract insights and actions are just a click away.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="dashboard-card">
            <h3 className="text-gray-400 mb-2">Total Contracts</h3>
            <div className="text-3xl font-bold">156</div>
            <div className="text-sm text-emerald-400">+12 this month</div>
          </div>
          
          <div className="dashboard-card">
            <h3 className="text-gray-400 mb-2">High Risk Contracts</h3>
            <div className="text-3xl font-bold">8</div>
            <div className="text-sm text-emerald-400">3 new this week</div>
          </div>
          
          <div className="dashboard-card">
            <h3 className="text-gray-400 mb-2">Resolved Issues</h3>
            <div className="text-3xl font-bold">42</div>
            <div className="text-sm text-emerald-400">85% resolution rate</div>
          </div>
          
          <div className="dashboard-card">
            <h3 className="text-gray-400 mb-2">Pending Review</h3>
            <div className="text-3xl font-bold">15</div>
            <div className="text-sm text-emerald-400">5 urgent items</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <button className="dashboard-card hover:bg-gray-800 transition-colors text-center">
            <div className="text-emerald-400 mb-2">
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <div className="text-sm">Upload Contract</div>
          </button>
          
          {/* Add other quick action buttons similarly */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 dashboard-card">
            <h2 className="text-xl font-semibold mb-4">Recent Analyses</h2>
            <FileListTable />
          </div>
          
          <div className="dashboard-card">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded bg-gray-800">
                <div className="text-yellow-400">⚠️</div>
                <div>
                  <div className="font-medium">High-risk contract detected</div>
                  <div className="text-sm text-gray-400">Contract #1234 requires immediate review</div>
                  <div className="text-xs text-gray-500 mt-1">2 minutes ago</div>
                </div>
              </div>
              {/* Add more notifications */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
