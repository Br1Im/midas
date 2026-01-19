# Интеграция парсера 2GIS

## Описание

Парсер 2GIS интегрирован в бэкенд Midas для автоматического поиска лидов из базы 2GIS.

## API Endpoints

### 1. Парсинг лидов

**POST** `/api/parse`

Парсит лиды из 2GIS по указанному URL.

**Request Body:**
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

### 2. Генерация URL

**GET** `/api/generate-url?city=moscow&rubric=рестораны&query=итальянские`

Генерирует URL для поиска в 2GIS.

**Response:**
```json
{
  "url": "https://2gis.ru/moscow/search/рестораны итальянские",
  "city": "moscow",
  "rubric": "рестораны",
  "query": "итальянские"
}
```

## Использование

### Установка зависимостей

```bash
cd backend
pip install -r requirements.txt
```

### Требования

- Google Chrome должен быть установлен
- Python 3.8+

### Пример использования в коде

```python
from src.services.parser_service import parser_service

# Парсинг лидов
leads = parser_service.parse_leads(
    url="https://2gis.ru/moscow/search/рестораны",
    max_records=50
)

# Результат - список лидов
for lead in leads:
    print(lead['name'], lead['phone'], lead['email'])
```

## Что парсится

- Название компании
- Телефон
- Email
- Адрес
- Сайт
- Рубрики
- Координаты

## Настройки парсера

В `src/services/parser_service.py` можно настроить:

- `headless` - скрытый режим браузера
- `disable_images` - отключить загрузку изображений
- `max_records` - максимальное количество записей
- `use_gc` - использовать сборщик мусора

## Примеры URL для парсинга

```
https://2gis.ru/moscow/search/рестораны
https://2gis.ru/spb/search/кафе
https://2gis.ru/kazan/search/салоны%20красоты
https://2gis.ru/novosibirsk/search/автосервисы
```

## Города

Доступные города: moscow, spb, kazan, novosibirsk, ekaterinburg, nizhny_novgorod, samara, omsk, chelyabinsk, rostov, ufa, krasnoyarsk, perm, voronezh, volgograd и другие.

## Ограничения

- 2GIS может блокировать при частых запросах
- Рекомендуется использовать задержки между запросами
- Максимум ~500 записей с одного URL (ограничение 2GIS)
