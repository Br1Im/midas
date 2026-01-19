'use client'

import { Plus, Play, Pause, BarChart, Calendar, Users } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCampaigns } from '@/hooks/useCampaigns'

export default function CampaignsPage() {
  const { campaigns, loading, error } = useCampaigns()

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
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Кампании</h1>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">Управление email-кампаниями</p>
          </div>
          <Link href="/campaigns" className="btn-primary flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Создать кампанию</span>
            <span className="sm:hidden">Создать</span>
          </Link>
        </div>
      </motion.div>

      {loading ? (
        <p className="text-gray-500 text-center py-8">Загрузка...</p>
      ) : error ? (
        <p className="text-red-400 text-center py-8">Ошибка: {error}</p>
      ) : campaigns.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Нет кампаний</p>
      ) : (
        <div className="space-y-4">
          {campaigns.map((campaign: any, index: number) => {
            const openRate = campaign.sent_count > 0 
              ? Math.round((campaign.opened_count / campaign.sent_count) * 100) 
              : 0
            const clickRate = campaign.sent_count > 0 
              ? Math.round((campaign.clicked_count / campaign.sent_count) * 100) 
              : 0

            return (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="card-elevated group"
              >
                <div className="flex items-start justify-between gap-6 relative z-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-xl font-semibold text-white group-hover:text-gold-400 transition-colors">{campaign.name}</h3>
                      <span className={`badge ${
                        campaign.status === 'active' ? 'badge-green' :
                        campaign.status === 'completed' ? 'badge-gray' :
                        'badge-gold'
                      }`}>
                        {campaign.status === 'active' ? 'Активна' :
                         campaign.status === 'completed' ? 'Завершена' :
                         'Черновик'}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-6 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        {new Date(campaign.created_at).toLocaleDateString('ru-RU')}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Users className="w-4 h-4" />
                        {campaign.lead_count || 0} лидов
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-8">
                      <div className="relative">
                        <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider">Отправлено</p>
                        <p className="text-3xl font-bold text-white">{campaign.sent_count || 0}</p>
                      </div>
                      <div className="relative">
                        <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider">Открыто</p>
                        <p className="text-3xl font-bold text-gold-400">{campaign.opened_count || 0}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {openRate}% открываемость
                        </p>
                      </div>
                      <div className="relative">
                        <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider">Клики</p>
                        <p className="text-3xl font-bold text-gold-400">{campaign.clicked_count || 0}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {clickRate}% CTR
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {campaign.status === 'active' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-secondary flex items-center gap-2 whitespace-nowrap"
                      >
                        <Pause className="w-4 h-4" />
                        Пауза
                      </motion.button>
                    )}
                    {campaign.status === 'draft' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary flex items-center gap-2 whitespace-nowrap"
                      >
                        <Play className="w-4 h-4" />
                        Запустить
                      </motion.button>
                    )}
                    <Link href={`/campaigns/${campaign.id}`} className="btn-secondary flex items-center gap-2 whitespace-nowrap">
                      <BarChart className="w-4 h-4" />
                      Статистика
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
