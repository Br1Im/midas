'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Mail,
  FileText,
  BarChart3,
  Settings,
  ChevronRight,
  X,
  Menu,
  Search,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function Sidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Дашборд', href: '/', icon: LayoutDashboard },
    { name: 'Поиск лидов', href: '/parser', icon: Search },
    { name: 'Лиды', href: '/leads', icon: Users },
    { name: 'Кампании', href: '/campaigns', icon: Mail },
    { name: 'Шаблоны', href: '/templates', icon: FileText },
    { name: 'Аналитика', href: '/analytics', icon: BarChart3 },
    { name: 'Настройки', href: '/settings', icon: Settings },
  ]

  const SidebarContent = () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-gold-600/5 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="relative p-6 border-b border-dark-800/30 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 8 }}
            whileTap={{ scale: 0.92 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 15,
            }}
            className="w-10 h-10 bg-gradient-gold rounded-xl flex items-center justify-center shadow-gold-sm backdrop-blur-sm cursor-pointer"
          >
            <span className="text-white font-bold text-xl">M</span>
          </motion.div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Midas
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              Lead Generation
            </p>
          </div>
        </div>
      </motion.div>

      <nav className="flex-1 p-4 relative overflow-y-auto">
        <ul className="space-y-1.5">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href
            return (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gold-600/90 backdrop-blur-sm rounded-xl border border-gold-500/20 shadow-gold-sm"
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                        mass: 0.8,
                      }}
                    />
                  )}
                  
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 bg-dark-800/50 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  <div className="flex items-center gap-3 relative z-10">
                    <motion.div
                      whileHover={{
                        scale: 1.15,
                        rotate: isActive ? 0 : 8,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 15,
                      }}
                    >
                      <item.icon className="w-5 h-5" />
                    </motion.div>
                    <span className="text-sm font-semibold">{item.name}</span>
                  </div>
                  
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: -10, scale: 0.8 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -10, scale: 0.8 }}
                      transition={{ 
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="relative z-10"
                    >
                      <ChevronRight className="w-4 h-4 opacity-60" />
                    </motion.div>
                  )}
                </Link>
              </motion.li>
            )
          })}
        </ul>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: 0.4,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="relative p-4 border-t border-dark-800/30"
      >
        <motion.div
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-dark-800/30 backdrop-blur-md border border-dark-700/30 cursor-pointer"
        >
          <div className="w-9 h-9 bg-gradient-to-br from-gold-600 to-gold-700 rounded-lg flex items-center justify-center shadow-gold-sm">
            <span className="text-white text-sm font-bold">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-200 truncate">
              User
            </p>
            <p className="text-xs text-gray-500 truncate">user@example.com</p>
          </div>
        </motion.div>
      </motion.div>
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-3 bg-dark-800/90 backdrop-blur-xl rounded-xl border border-white/10 text-gray-300 hover:text-white hover:border-gold-500/30 transition-all shadow-lg"
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </motion.button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-dark-900/40 backdrop-blur-2xl border-r border-dark-800/30 flex-col relative shadow-2xl">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-dark-900/95 backdrop-blur-2xl border-r border-white/10 flex flex-col z-40 shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
