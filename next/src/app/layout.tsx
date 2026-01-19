import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/layout/Sidebar'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Midas - Лидогенерация',
  description: 'Платформа для автоматизации поиска лидов и email-кампаний',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <div className="flex h-screen bg-dark-950 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-gradient-dark relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-900/5 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 pt-16 lg:pt-0">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
