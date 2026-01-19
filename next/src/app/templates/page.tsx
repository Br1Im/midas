'use client'

import { Plus, Mail, Copy, MoreVertical, Clock } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTemplates } from '@/hooks/useTemplates'

export default function TemplatesPage() {
  const { templates, loading, error } = useTemplates()

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="page-header"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Шаблоны писем</h1>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">Создавайте и управляйте шаблонами для кампаний</p>
          </div>
          <Link href="/templates" className="btn-primary flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Создать шаблон</span>
            <span className="sm:hidden">Создать</span>
          </Link>
        </div>
      </motion.div>

      {loading ? (
        <p className="text-gray-500 text-center py-8">Загрузка...</p>
      ) : error ? (
        <p className="text-red-400 text-center py-8">Ошибка: {error}</p>
      ) : templates.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Нет шаблонов</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {templates.map((template: any, index: number) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="card-elevated group hover:border-gold-500/30"
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="w-12 h-12 bg-gradient-to-br from-gold-600 to-gold-700 rounded-xl flex items-center justify-center shadow-gold-sm"
                  >
                    <Mail className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="flex items-center gap-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4 text-gray-500 hover:text-gray-300" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-gray-500 hover:text-gray-300" />
                    </motion.button>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors">{template.name}</h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2 min-h-[2.5rem]">{template.subject}</p>
                
                <div className="flex items-center gap-3 mb-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(template.updated_at).toLocaleDateString('ru-RU')}
                  </div>
                  <div className="px-2 py-0.5 bg-white/5 rounded text-xs font-semibold text-gray-400">
                    {template.language || 'RU'}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Использован <span className="text-gold-400 font-semibold">{template.usage_count || 0}</span> раз
                  </span>
                  <Link href={`/templates/${template.id}`} className="text-sm text-gold-500 hover:text-gold-400 font-semibold transition-colors">
                    Редактировать
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
