'use client'

import { useState } from 'react'
import { Search, Plus, Filter, Download, MoreVertical } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLeads } from '@/hooks/useLeads'

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const { leads, loading, error } = useLeads()

  const filteredLeads = leads.filter((lead: any) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      lead.name?.toLowerCase().includes(query) ||
      lead.email?.toLowerCase().includes(query) ||
      lead.company?.toLowerCase().includes(query)
    )
  })

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
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Лиды</h1>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">Управление базой потенциальных клиентов</p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-ghost flex items-center gap-2 text-sm"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Экспорт</span>
            </motion.button>
            <Link href="/leads" className="btn-primary flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Добавить лидов</span>
              <span className="sm:hidden">Добавить</span>
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="card-elevated mb-4 sm:mb-6"
      >
        <div className="flex flex-col sm:flex-row gap-3 relative z-10">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Поиск..."
              className="input pl-12 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary flex items-center justify-center gap-2 whitespace-nowrap text-sm"
          >
            <Filter className="w-4 h-4" />
            Фильтры
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="card-elevated"
      >
        <div className="overflow-x-auto relative z-10 -mx-4 sm:mx-0">
          {loading ? (
            <p className="text-gray-500 text-center py-8 px-4">Загрузка...</p>
          ) : error ? (
            <p className="text-red-400 text-center py-8 px-4">Ошибка: {error}</p>
          ) : filteredLeads.length === 0 ? (
            <p className="text-gray-500 text-center py-8 px-4">
              {searchQuery ? 'Ничего не найдено' : 'Нет лидов'}
            </p>
          ) : (
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Контакт</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Компания</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Позиция</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Статус</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Score</th>
                  <th className="text-right py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead: any, index: number) => (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">{lead.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{lead.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-300">{lead.company || '-'}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-400">{lead.position || '-'}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`badge ${
                        lead.status === 'qualified' ? 'badge-green' :
                        lead.status === 'contacted' ? 'badge-gold' :
                        'badge-gray'
                      }`}>
                        {lead.status === 'qualified' ? 'Квалифицирован' :
                         lead.status === 'contacted' ? 'Контакт' :
                         'Новый'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${lead.score || 0}%` }}
                            transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                            className={`h-full rounded-full ${
                              (lead.score || 0) >= 80 ? 'bg-green-500' :
                              (lead.score || 0) >= 60 ? 'bg-gold-500' :
                              'bg-gray-500'
                            }`}
                          />
                        </div>
                        <span className="text-xs font-semibold text-gray-400">{lead.score || 0}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/leads/${lead.id}`} className="text-sm text-gold-500 hover:text-gold-400 font-medium transition-colors">
                          Открыть
                        </Link>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-1 hover:bg-white/5 rounded transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-500" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        {!loading && filteredLeads.length > 0 && (
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5 relative z-10">
            <p className="text-sm text-gray-500">Показано {filteredLeads.length} из {leads.length} лидов</p>
            <div className="flex items-center gap-2">
              <button className="btn-ghost px-3 py-1.5 text-sm">Назад</button>
              <button className="btn-ghost px-3 py-1.5 text-sm bg-white/5">1</button>
              <button className="btn-ghost px-3 py-1.5 text-sm">2</button>
              <button className="btn-ghost px-3 py-1.5 text-sm">3</button>
              <button className="btn-ghost px-3 py-1.5 text-sm">Далее</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
