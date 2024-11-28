import { FileUpload } from '../components/FileUpload'
import { FileListTable } from '../components/FileListTable'

export default function FilesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">File Management</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload File</h2>
        <FileUpload />
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Files</h2>
        <FileListTable />
      </div>
    </div>
  )
}
