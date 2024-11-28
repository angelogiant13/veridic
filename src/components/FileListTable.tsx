import { useState, useEffect } from 'react'
import axios from 'axios'

interface FileData {
  name: string
  size: number
  lastModified: string
  status?: 'high-risk' | 'medium-risk' | 'low-risk'
  type?: string
}

export default function FileListTable() {
  const [files, setFiles] = useState<FileData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    try {
      const { data } = await axios.get('/api/files')
      setFiles(data)
      setLoading(false)
    } catch (err) {
      setError('Failed to load files')
      setLoading(false)
    }
  }

  const handleDownload = async (fileName: string) => {
    try {
      const { data } = await axios.get(`/api/download?filename=${fileName}`, {
        responseType: 'blob'
      })
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (err) {
      setError('Download failed')
    }
  }

  const handleDelete = async (fileName: string) => {
    try {
      await axios.delete(`/api/delete?filename=${fileName}`)
      setFiles(files.filter(file => file.name !== fileName))
    } catch (err) {
      setError('Delete failed')
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'high-risk':
        return 'text-red-400'
      case 'medium-risk':
        return 'text-yellow-400'
      case 'low-risk':
        return 'text-emerald-400'
      default:
        return 'text-gray-400'
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400" />
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-400 border-b border-gray-700">
            <th className="pb-3 font-medium">Name</th>
            <th className="pb-3 font-medium">Type</th>
            <th className="pb-3 font-medium">Size</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium">Last Modified</th>
            <th className="pb-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {files.map(file => (
            <tr key={file.name} className="hover:bg-gray-800/50">
              <td className="py-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {file.name}
                </div>
              </td>
              <td className="py-4 text-gray-400">{file.type || 'Document'}</td>
              <td className="py-4 text-gray-400">{formatFileSize(file.size)}</td>
              <td className={`py-4 ${getStatusColor(file.status)}`}>
                {file.status || 'Pending'}
              </td>
              <td className="py-4 text-gray-400">{file.lastModified}</td>
              <td className="py-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDownload(file.name)}
                    className="p-1 hover:text-emerald-400 transition-colors"
                    title="Download"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(file.name)}
                    className="p-1 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {error && (
        <div className="mt-4 text-red-400 text-sm text-center">
          {error}
        </div>
      )}

      {files.length === 0 && !error && (
        <div className="text-center py-12 text-gray-400">
          No files uploaded yet
        </div>
      )}
    </div>
  )
}
