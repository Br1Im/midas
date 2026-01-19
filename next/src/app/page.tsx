'use client'

import {
  BarChart3,
  Mail,
  Users,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLeads } from '@/hooks/useLeads'
import { useCampaigns } from '@/hooks/useCampaigns'

export default function Dashboard() {
  const { leads, loading: leadsLoading } = useLeads()
  const { campaigns, loading: campaignsLoading } = useCampaigns()

  const activeCampaigns = campaigns.filter((c: any) => c.status === 'active')
  const totalSent = campaigns.reduce((sum: number, c: any) => sum + (c.sent_count || 0), 0)
  const totalOpened = campaigns.reduce((sum: number, c: any) => sum + (c.opened_count || 0), 0)
  const openRate = totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(1) : '0'

  const stats = [
    {
      label: 'Всего лидов',
      value: leadsLoading ? '...' : leads.length.toString(),
      icon: Users,
    },
    {
      label: 'Активные кампании',
      value: campaignsLoading ? '...' : activeCampaigns.length.toString(),
      icon: Mail,
    },
    {
      label: 'Открываемость',
      value: `${openRate}%`,
      icon: TrendingUp,
    },
    {
      label: 'Конверсия',
      value: '8.5%',
      icon: BarChart3,
    },
  ]

  const recentCampaigns = campaigns.slice(0, 3)

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="page-header"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Дашборд
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">Обзор ваших кампаний и лидов</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
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
              <p className="text-3xl font-bold text-white mb-1 tracking-tight group-hover:text-gold-400 transition-colors duration-300">
                {stat.value}
              </p>
              <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-2 card-elevated"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title">Последние кампании</h2>
            <Link
              href="/campaigns"
              className="text-sm text-gold-500 hover:text-gold-400 flex items-center gap-1 font-semibold transition-all duration-200 hover:gap-2"
            >
              Все кампании
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {campaignsLoading ? (
              <p className="text-gray-500 text-center py-8">Загрузка...</p>
            ) : recentCampaigns.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Нет кампаний</p>
            ) : (
              recentCampaigns.map((campaign: any, i: number) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.4 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative overflow-hidden flex items-center justify-between p-4 bg-white/[0.03] backdrop-blur-xl rounded-xl border border-white/10 hover:border-gold-500/30 hover:bg-white/[0.05] transition-all duration-300 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-50 pointer-events-none" />
                  
                  <div className="flex-1 relative z-10">
                    <p className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                      {campaign.name}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <p className="text-xs text-gray-500">
                        <span className="text-gray-400 font-medium">
                          {campaign.sent_count || 0}
                        </span>{' '}
                        отправлено
                      </p>
                      <p className="text-xs text-gray-500">
                        <span className="text-gold-400 font-medium">
                          {campaign.opened_count || 0}
                        </span>{' '}
                        открыто
                      </p>
                      <p className="text-xs text-gray-500">
                        <span className="text-gray-400 font-medium">
                          {campaign.sent_count > 0 
                            ? Math.round((campaign.opened_count / campaign.sent_count) * 100)
                            : 0}%
                        </span>{' '}
                        rate
                      </p>
                    </div>
                  </div>
                  <span
                    className={`badge relative z-10 ${
                      campaign.status === 'active'
                        ? 'badge-green'
                        : 'badge-gray'
                    }`}
                  >
                    {campaign.status === 'active' ? 'Активна' : 'Завершена'}
                  </span>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="card-elevated"
        >
          <h2 className="section-title mb-6">Быстрые действия</h2>
          <div className="space-y-3">
            {[
              {
                href: '/leads',
                icon: Users,
                title: 'Добавить лидов',
                desc: 'Импорт или поиск новых лидов',
              },
              {
                href: '/campaigns',
                icon: Mail,
                title: 'Создать кампанию',
                desc: 'Запустить новую email-кампанию',
              },
              {
                href: '/templates',
                icon: BarChart3,
                title: 'Шаблоны писем',
                desc: 'Создать или редактировать шаблоны',
              },
            ].map((action, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.5 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={action.href}
                  className="relative overflow-hidden block p-5 bg-white/[0.03] backdrop-blur-xl rounded-xl border border-white/10 hover:border-gold-500/30 hover:bg-white/[0.05] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-50 pointer-events-none" />
                  
                  <div className="flex items-start gap-3 relative z-10">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className="w-10 h-10 bg-gold-600/10 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-gold-600/20 border border-gold-500/10 group-hover:border-gold-500/20 transition-all duration-300"
                    >
                      <action.icon className="w-5 h-5 text-gold-500" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                        {action.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{action.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
