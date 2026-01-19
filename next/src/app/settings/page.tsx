'use client'

import { Save } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SettingsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="page-header"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Настройки</h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Конфигурация системы и интеграций
        </p>
      </motion.div>

      <div className="space-y-4 sm:space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="card-elevated"
        >
          <h2 className="text-lg font-semibold text-white mb-6">
            Email настройки
          </h2>
          <div className="space-y-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                SMTP сервер
              </label>
              <input
                type="text"
                className="input"
                placeholder="smtp.gmail.com"
              />
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="input"
                  placeholder="your@email.com"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Пароль
                </label>
                <input type="password" className="input" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="card-elevated"
        >
          <h2 className="text-lg font-semibold text-white mb-6">
            API интеграции
          </h2>
          <div className="space-y-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                OpenAI API Key
              </label>
              <input type="password" className="input" placeholder="sk-..." />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Hunter.io API Key
              </label>
              <input type="password" className="input" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="card-elevated"
        >
          <h2 className="text-lg font-semibold text-white mb-6">
            Лимиты отправки
          </h2>
          <div className="space-y-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Писем в час
              </label>
              <input type="number" className="input" defaultValue="50" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Писем в день
              </label>
              <input type="number" className="input" defaultValue="500" />
            </motion.div>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Сохранить настройки
        </motion.button>
      </div>
    </div>
  )
}
