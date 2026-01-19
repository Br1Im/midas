'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { parserApi } from '@/lib/api'

const cities = [
  { value: 'moscow', label: 'Москва' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'kazan', label: 'Казань' },
  { value: 'novosibirsk', label: 'Новосибирск' },
  { value: 'ekaterinburg', label: 'Екатеринбург' },
  { value: 'nizhny_novgorod', label: 'Нижний Новгород' },
  { value: 'samara', label: 'Самара' },
  { value: 'omsk', label: 'Омск' },
  { value: 'chelyabinsk', label: 'Челябинск' },
  { value: 'rostov', label: 'Ростов-на-Дону' },
  { value: 'ufa', label: 'Уфа' },
  { value: 'krasnoyarsk', label: 'Красноярск' },
  { value: 'perm', label: 'Пермь' },
  { value: 'voronezh', label: 'Воронеж' },
  { value: 'volgograd', label: 'Волгоград' },
  { value: 'saratov', label: 'Саратов' },
  { value: 'krasnodar', label: 'Краснодар' },
  { value: 'tolyatti', label: 'Тольятти' },
  { value: 'izhevsk', label: 'Ижевск' },
  { value: 'barnaul', label: 'Барнаул' },
  { value: 'ulyanovsk', label: 'Ульяновск' },
  { value: 'irkutsk', label: 'Иркутск' },
  { value: 'khabarovsk', label: 'Хабаровск' },
  { value: 'yaroslavl', label: 'Ярославль' },
  { value: 'vladivostok', label: 'Владивосток' },
  { value: 'tomsk', label: 'Томск' },
  { value: 'orenburg', label: 'Оренбург' },
  { value: 'kemerovo', label: 'Кемерово' },
  { value: 'novokuznetsk', label: 'Новокузнецк' },
  { value: 'ryazan', label: 'Рязань' },
  { value: 'astrakhan', label: 'Астрахань' },
  { value: 'penza', label: 'Пенза' },
  { value: 'lipetsk', label: 'Липецк' },
  { value: 'kirov', label: 'Киров' },
  { value: 'cheboksary', label: 'Чебоксары' },
  { value: 'tula', label: 'Тула' },
  { value: 'kaliningrad', label: 'Калининград' },
  { value: 'kursk', label: 'Курск' },
  { value: 'sochi', label: 'Сочи' },
  { value: 'tver', label: 'Тверь' },
  { value: 'magnitogorsk', label: 'Магнитогорск' },
  { value: 'ivanovo', label: 'Иваново' },
  { value: 'bryansk', label: 'Брянск' },
  { value: 'belgorod', label: 'Белгород' },
  { value: 'surgut', label: 'Сургут' },
  { value: 'vladimir', label: 'Владимир' },
  { value: 'nizhniy_tagil', label: 'Нижний Тагил' },
  { value: 'arhangelsk', label: 'Архангельск' },
  { value: 'kaluga', label: 'Калуга' },
  { value: 'smolensk', label: 'Смоленск' },
  { value: 'kurgan', label: 'Курган' },
  { value: 'orel', label: 'Орёл' },
  { value: 'vologda', label: 'Вологда' },
  { value: 'tambov', label: 'Тамбов' },
  { value: 'sterlitamak', label: 'Стерлитамак' },
  { value: 'kostroma', label: 'Кострома' },
  { value: 'petrozavodsk', label: 'Петрозаводск' },
  { value: 'nizhnevartovsk', label: 'Нижневартовск' },
  { value: 'yoshkar_ola', label: 'Йошкар-Ола' },
  { value: 'novorossiysk', label: 'Новороссийск' },
  { value: 'syktyvkar', label: 'Сыктывкар' },
  { value: 'pskov', label: 'Псков' },
  { value: 'korolyov', label: 'Королёв' },
  { value: 'mytishchi', label: 'Мытищи' },
  { value: 'balashikha', label: 'Балашиха' },
  { value: 'khimki', label: 'Химки' },
  { value: 'murmansk', label: 'Мурманск' },
]

const popularRubrics = [
  'рестораны',
  'кафе',
  'салоны красоты',
  'автосервисы',
  'фитнес клубы',
  'стоматологии',
  'медицинские центры',
  'магазины',
  'гостиницы',
  'агентства недвижимости',
  'строительные компании',
  'юридические услуги',
  'бухгалтерские услуги',
  'IT компании',
  'рекламные агентства',
  'типографии',
  'клининговые услуги',
  'доставка еды',
  'такси',
  'автошколы',
]

export default function ParserPage() {
  const [city, setCity] = useState('moscow')
  const [rubric, setRubric] = useState('')
  const [customRubric, setCustomRubric] = useState('')
  const [useCustomRubric, setUseCustomRubric] = useState(false)
  const [customUrl, setCustomUrl] = useState('')
  const [maxRecords, setMaxRecords] = useState(50)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')
  const [useCustomUrl, setUseCustomUrl] = useState(false)

  const handleParse = async () => {
    setIsLoading(true)
    setError('')
    setResult(null)

    try {
      let url = customUrl

      if (!useCustomUrl) {
        const finalRubric = useCustomRubric ? customRubric : rubric
        if (!finalRubric) {
          setError('Укажите рубрику')
          setIsLoading(false)
          return
        }
        const urlResponse = await parserApi.generateUrl({ city, rubric: finalRubric })
        url = urlResponse.data.url
      }

      if (!url) {
        setError('Укажите URL')
        setIsLoading(false)
        return
      }

      const response = await parserApi.parse({
        url,
        max_records: maxRecords,
        auto_save: true,
      })

      setResult(response.data)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Ошибка парсинга')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Поиск лидов 2GIS</h1>
        <p className="text-gray-400">Парсинг контактов компаний из 2GIS</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl p-6 lg:p-8"
      >
        <div className="space-y-6">
          {/* Переключатель режима */}
          <div className="flex gap-4">
            <button
              onClick={() => setUseCustomUrl(false)}
              className={`flex-1 py-3 px-4 rounded-xl transition-all ${
                !useCustomUrl
                  ? 'bg-gold-500/20 border border-gold-500/30 text-gold-400'
                  : 'bg-white/[0.02] border border-white/5 text-gray-400 hover:bg-white/[0.05]'
              }`}
            >
              Поиск по параметрам
            </button>
            <button
              onClick={() => setUseCustomUrl(true)}
              className={`flex-1 py-3 px-4 rounded-xl transition-all ${
                useCustomUrl
                  ? 'bg-gold-500/20 border border-gold-500/30 text-gold-400'
                  : 'bg-white/[0.02] border border-white/5 text-gray-400 hover:bg-white/[0.05]'
              }`}
            >
              Свой URL
            </button>
          </div>

          {!useCustomUrl ? (
            <>
              {/* Город */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Город
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-dark-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500/50 transition-colors"
                >
                  {cities.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Рубрика */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Рубрика
                </label>
                
                {!useCustomRubric ? (
                  <div className="space-y-2">
                    <select
                      value={rubric}
                      onChange={(e) => setRubric(e.target.value)}
                      className="w-full bg-dark-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500/50 transition-colors"
                    >
                      <option value="">Выберите рубрику</option>
                      {popularRubrics.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => setUseCustomRubric(true)}
                      className="text-sm text-gold-400 hover:text-gold-300 transition-colors"
                    >
                      Ввести свою рубрику
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={customRubric}
                      onChange={(e) => setCustomRubric(e.target.value)}
                      placeholder="Например: барбершопы, пекарни, автомойки"
                      className="w-full bg-dark-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50 transition-colors"
                    />
                    <button
                      onClick={() => {
                        setUseCustomRubric(false)
                        setCustomRubric('')
                      }}
                      className="text-sm text-gold-400 hover:text-gold-300 transition-colors"
                    >
                      Выбрать из списка
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Свой URL */
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                URL 2GIS
              </label>
              <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://2gis.ru/moscow/search/рестораны"
                className="w-full bg-dark-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50 transition-colors"
              />
            </div>
          )}

          {/* Количество записей */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Максимум записей: {maxRecords}
            </label>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={maxRecords}
              onChange={(e) => setMaxRecords(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10</span>
              <span>500</span>
            </div>
          </div>

          {/* Кнопка парсинга */}
          <motion.button
            onClick={handleParse}
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 font-semibold py-4 px-6 rounded-xl hover:from-gold-400 hover:to-gold-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Парсинг...' : 'Начать парсинг'}
          </motion.button>

          {/* Ошибка */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400"
            >
              {error}
            </motion.div>
          )}

          {/* Результат */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 space-y-3"
            >
              <div className="flex items-center gap-2 text-green-400 font-semibold text-lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Парсинг завершён
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/[0.03] rounded-lg p-3">
                  <div className="text-gray-400 mb-1">Найдено</div>
                  <div className="text-2xl font-bold text-white">{result.leads_found}</div>
                </div>
                <div className="bg-white/[0.03] rounded-lg p-3">
                  <div className="text-gray-400 mb-1">Сохранено</div>
                  <div className="text-2xl font-bold text-gold-400">{result.leads_saved}</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm">{result.message}</p>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Инструкция */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Как использовать</h3>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-gold-400 mt-1">•</span>
            <span>Выберите город и рубрику (из списка или введите свою) или вставьте URL из 2GIS</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold-400 mt-1">•</span>
            <span>Укажите максимальное количество записей для парсинга (10-500)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold-400 mt-1">•</span>
            <span>Нажмите "Начать парсинг" и дождитесь результата</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold-400 mt-1">•</span>
            <span>Все найденные лиды автоматически сохранятся в базу данных</span>
          </li>
        </ul>
        
        <div className="mt-4 pt-4 border-t border-white/10">
          <h4 className="text-sm font-semibold text-gold-400 mb-2">⚠️ Требования</h4>
          <ul className="space-y-1 text-gray-400 text-xs">
            <li>• Google Chrome должен быть установлен на сервере</li>
            <li>• Не делайте слишком частые запросы (2GIS может заблокировать)</li>
            <li>• Рекомендуется парсить не более 100-200 записей за раз</li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}
