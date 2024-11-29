import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from '../components/layout/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cypher AI',
  description: 'Contract Intelligence Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
