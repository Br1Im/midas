# 🚀 Настройка парсера 2GIS

## ✅ Статус интеграции

Парсер 2GIS **полностью интегрирован** и протестирован!

## 📋 Установленные зависимости

```bash
pip install pychrome websocket-client openpyxl xlsxwriter
```

Все зависимости добавлены в `requirements.txt`.

## ✓ Пройденные тесты

1. ✓ Импорт модулей парсера
2. ✓ Импорт сервиса парсера
3. ✓ Инициализация сервиса
4. ✓ Трансформация данных
5. ✓ Импорт API роутов

## 🎯 Как использовать

### 1. Запустить бэкенд

```bash
cd backend
python -m uvicorn src.main:app --reload --host 0.0.0.0 --port 8001
```

### 2. Использовать API

#### Парсинг лидов

```bash
curl -X POST http://localhost:8001/api/parse \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://2gis.ru/moscow/search/рестораны",
    "max_records": 10,
    "auto_save": true
  }'
```

#### Генерация URL

```bash
curl "http://localhost:8001/api/generate-url?city=moscow&rubric=рестораны"
```

### 3. Использовать в коде

```python
from src.services.parser_service import parser_service

# Парсинг лидов
leads = parser_service.parse_leads(
    url="https://2gis.ru/moscow/search/кафе",
    max_records=50
)

# Результат
for lead in leads:
    print(f"{lead['name']}: {lead['phone']}, {lead['email']}")
```

## 📊 Что парсится

- ✓ Название компании
- ✓ Телефон
- ✓ Email
- ✓ Адрес
- ✓ Сайт
- ✓ Рубрики
- ✓ Координаты

## ⚙️ Настройки

В `src/services/parser_service.py`:

```python
chrome_options = ChromeOptions(
    headless=True,           # Скрытый режим
    silent_browser=True,     # Без логов браузера
    disable_images=True      # Без изображений (быстрее)
)

parser_options = ParserOptions(
    max_records=100,         # Макс. записей
    skip_404_response=True,  # Пропускать 404
    use_gc=True,            # Сборщик мусора
    gc_pages_interval=5     # Интервал GC
)
```

## 🌍 Примеры URL

```
https://2gis.ru/moscow/search/рестораны
https://2gis.ru/spb/search/кафе
https://2gis.ru/kazan/search/салоны%20красоты
https://2gis.ru/novosibirsk/search/автосервисы
https://2gis.ru/ekaterinburg/search/фитнес%20клубы
```

## 🏙️ Доступные города

moscow, spb, kazan, novosibirsk, ekaterinburg, nizhny_novgorod, samara, omsk, chelyabinsk, rostov, ufa, krasnoyarsk, perm, voronezh, volgograd, saratov, krasnodar, tolyatti, izhevsk, barnaul, ulyanovsk, irkutsk, khabarovsk, yaroslavl, vladivostok, mahachkala, tomsk, orenburg, kemerovo, novokuznetsk, ryazan, astrakhan, penza, lipetsk, kirov, cheboksary, tula, kaliningrad, kursk, sochi, ulan-ude, tver, magnitogorsk, ivanovo, bryansk, belgorod, surgut, vladimir, nizhniy_tagil, arhangelsk, chita, kaluga, smolensk, volzhskiy, kurgan, orel, cherepovets, vologda, saransk, tambov, sterlitamak, grozniy, yakutsk, kostroma, komsomolsk_na_amure, petrozavodsk, taganrog, nizhnevartovsk, yoshkar_ola, bratsk, dzhankoy, novorossiysk, nalchik, syktyvkar, staryy_oskol, nizhnekamsk, shakhty, dzerzhinsk, orekhovo_zuevo, angarsk, blagoveshchensk, velikiy_novgorod, pskov, biysk, prokopyevsk, rybinsk, balakovo, armavir, severodvinsk, korolyov, petropavlovsk_kamchatskiy, mytishchi, lyubertsy, syzran, novocherkassk, zlatoust, kamensk_uralskiy, balashikha, norilsk, podolsk, khimki, murmansk, elektrostal, kolomna, murom, krasnogorsk, kovrov, berezniki, pyatigorsk, odintsovo, ussuriysk, neftekamsk, serpukhov, shchelkovo, pervouralsk, novomoskovsk, dimitrovgrad, orsk, kamyshin, kislovodsk, sergieyev_posad, novocheboksarsk, nefteyugansk, cherkessk, derbent, arzamas, bataysk, kopeysk, khasavyurt, rubtsovsk, magadan, miass, novotroitsk, yelets, volgodonsk, obninsk, ust_ilimsk, arkhangelsk, abakan, salavat, yuzhno_sakhalinsk, prokopyevsk, mezhdurechensk, achinsk, seversk, oktyabrskiy, leninsk_kuznetskiy, novouralsk, kyzyl, zheleznodorozhnyy, kansk, glazov, solikamsk, vorkuta, ukhta, sarapul, gorno_altaysk, elista, asbest, votkinsk, bugulma, segezha, chistopol, tuymazy, sibay, kumertau, noyabrsk, megion, langepas, kogalym, nyagan, raduzhnyy, pyt_yakh, uray, khanty_mansiysk, surgut, nizhnevartovsk, nefteyugansk

## ⚠️ Важно

1. **Chrome обязателен** - парсер использует Chrome для обхода защиты
2. **Лимиты 2GIS** - не более ~500 записей с одного URL
3. **Задержки** - рекомендуется делать паузы между запросами
4. **Блокировки** - при частых запросах 2GIS может временно блокировать

## 🧪 Запуск тестов

```bash
cd backend
python test_parser_simple.py
```

## 📝 API Endpoints

### POST /api/parse
Парсит лиды из 2GIS

**Request:**
```json
{
  "url": "https://2gis.ru/moscow/search/рестораны",
  "max_records": 100,
  "auto_save": true
}
```

**Response:**
```json
{
  "success": true,
  "leads_found": 50,
  "leads_saved": 45,
  "message": "Successfully parsed 50 leads from 2GIS"
}
```

### GET /api/generate-url
Генерирует URL для поиска

**Query params:**
- `city` - город (moscow, spb, etc.)
- `rubric` - рубрика (рестораны, кафе, etc.)
- `query` - дополнительный запрос (optional)

**Response:**
```json
{
  "url": "https://2gis.ru/moscow/search/рестораны",
  "city": "moscow",
  "rubric": "рестораны",
  "query": null
}
```

## 🎉 Готово!

Парсер полностью интегрирован и готов к использованию!
