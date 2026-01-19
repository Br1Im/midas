'use client'

import { BarChart3, TrendingUp, Mail, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCampaigns } from '@/hooks/useCampaigns'

export default function AnalyticsPage() {
  const { campaigns, loading: campaignsLoading } = useCampaigns()

  const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
  
  // Calculate stats from real data
  const totalSent = campaigns.reduce((sum: number, c: any) => sum + (c.sent_count || 0), 0)
  const totalOpened = campaigns.reduce((sum: number, c: any) => sum + (c.opened_count || 0), 0)
  const totalClicked = campaigns.reduce((sum: number, c: any) => sum + (c.clicked_count || 0), 0)
  const openRate = totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(1) : '0'
  const clickRate = totalSent > 0 ? ((totalClicked / totalSent) * 100).toFixed(1) : '0'
  const conversions = Math.round(totalClicked * 0.15) // Примерная конверсия 15% от кликов

  // Generate chart data based on campaigns
  const chartData = months.map((_, index) => {
    const monthCampaigns = campaigns.filter((c: any) => {
      const date = new Date(c.created_at)
      return date.getMonth() === index
    })
    return monthCampaigns.reduce((sum: number, c: any) => sum + (c.sent_count || 0), 0) / 10
  })

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="page-header"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Аналитика</h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">Детальная статистика ваших кампаний</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
        {[
          { 
            label: 'Всего отправлено', 
            value: campaignsLoading ? '...' : totalSent.toString(), 
            icon: Mail
          },
          { 
            label: 'Открываемость', 
            value: `${openRate}%`, 
            icon: TrendingUp
          },
          { 
            label: 'CTR', 
            value: `${clickRate}%`, 
            icon: BarChart3
          },
          { 
            label: 'Конверсии', 
            value: conversions.toString(), 
            icon: Users
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="stat-card group"
          >
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-5">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="w-12 h-12 bg-gradient-to-br from-gold-600 to-gold-700 rounded-xl flex items-center justify-center shadow-gold-sm"
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </motion.div>
              </div>
              <p className="text-3xl font-bold text-white mb-1 tracking-tight">{stat.value}</p>
              <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="card-elevated"
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-semibold text-white">График активности</h2>
              <p className="text-sm text-gray-400 mt-1">Отправленные письма за последний год</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn-ghost px-3 py-1.5 text-sm">Неделя</button>
              <button className="btn-ghost px-3 py-1.5 text-sm">Месяц</button>
              <button className="btn-ghost px-3 py-1.5 text-sm bg-white/5">Год</button>
            </div>
          </div>

          <div className="relative">
            <div className="h-80 flex items-end justify-between gap-3">
              {chartData.map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: `${height * 3}px`, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex-1 flex flex-col items-center gap-2 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-full bg-gradient-to-t from-gold-700 to-gold-500 rounded-t-lg hover:from-gold-600 hover:to-gold-400 transition-all duration-300 cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                  <span className="text-xs text-gray-500 font-medium">{months[i]}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-white/5">
            <div>
              <p className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wider">Средняя открываемость</p>
              <p className="text-2xl font-bold text-white">{campaignsLoading ? '...' : `${openRate}%`}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wider">Средний CTR</p>
              <p className="text-2xl font-bold text-white">{campaignsLoading ? '...' : `${clickRate}%`}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wider">Всего кампаний</p>
              <p className="text-2xl font-bold text-white">{campaignsLoading ? '...' : campaigns.length}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
