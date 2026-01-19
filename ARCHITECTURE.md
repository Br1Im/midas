# Midas - Система лидогенерации

## Обзор проекта

Midas - автоматизированная платформа для поиска потенциальных клиентов, генерации персонализированных писем и управления email-кампаниями.

## Архитектура системы

### Основные компоненты

```
┌─────────────────────────────────────────────────────────────┐
│                        API Gateway                           │
│                      (FastAPI/Express)                       │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│Lead Discovery│    │Email Generator│    │Email Sender  │
│   Service    │    │   Service     │    │   Service    │
└──────────────┘    └──────────────┘    └──────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
            ┌──────────────┐    ┌──────────────┐
            │  PostgreSQL  │    │    Redis     │
            │   Database   │    │    Cache     │
            └──────────────┘    └──────────────┘
```

## Модули системы

### 1. Lead Discovery Service
**Функции:**
- Поиск потенциальных лидов через различные источники
- Парсинг публичных данных (LinkedIn, компании, каталоги)
- Интеграция с API (Apollo.io, Hunter.io, Clearbit)
- Обогащение данных о лидах
- Валидация и дедупликация

**Технологии:**
- Web scraping: BeautifulSoup, Scrapy, Playwright
- API клиенты для внешних сервисов
- Очередь задач для асинхронной обработки

### 2. Email Generation Service
**Функции:**
- Генерация персонализированных писем
- Шаблонизация с динамическими переменными
- AI-генерация контента (OpenAI GPT, Claude)
- A/B тестирование вариантов писем
- Мультиязычная поддержка

**Технологии:**
- Template engine (Jinja2, Handlebars)
- LLM API интеграция
- NLP для персонализации

### 3. Email Sending Service
**Функции:**
- Отправка email через SMTP/API
- Управление очередью отправки
- Rate limiting и throttling
- Трекинг открытий и кликов
- Обработка bounce/unsubscribe
- Warm-up для новых доменов

**Технологии:**
- SMTP клиенты
- Email API (SendGrid, Mailgun, AWS SES)
- Tracking pixels и link wrapping

### 4. Database Schema

**Таблицы:**

```sql
-- Лиды
leads (
  id, email, first_name, last_name, company,
  position, linkedin_url, phone, location,
  industry, company_size, source, status,
  created_at, updated_at
)

-- Кампании
campaigns (
  id, name, description, status, 
  start_date, end_date, created_at
)

-- Шаблоны писем
email_templates (
  id, name, subject, body, variables,
  language, created_at, updated_at
)

-- Отправленные письма
sent_emails (
  id, lead_id, campaign_id, template_id,
  subject, body, sent_at, opened_at,
  clicked_at, bounced, unsubscribed
)

-- Активности
activities (
  id, lead_id, type, description,
  metadata, created_at
)
```

## API Endpoints

### Lead Discovery
- `POST /api/leads/search` - Поиск новых лидов
- `GET /api/leads` - Список лидов
- `GET /api/leads/{id}` - Детали лида
- `PUT /api/leads/{id}` - Обновление лида
- `POST /api/leads/import` - Импорт лидов из CSV/Excel
- `POST /api/leads/enrich` - Обогащение данных лида

### Email Generation
- `POST /api/templates` - Создание шаблона
- `GET /api/templates` - Список шаблонов
- `POST /api/emails/generate` - Генерация письма для лида
- `POST /api/emails/generate-ai` - AI-генерация письма

### Email Sending
- `POST /api/campaigns` - Создание кампании
- `GET /api/campaigns` - Список кампаний
- `POST /api/campaigns/{id}/send` - Запуск кампании
- `GET /api/campaigns/{id}/stats` - Статистика кампании
- `POST /api/emails/send` - Отправка одного письма

### Analytics
- `GET /api/analytics/overview` - Общая статистика
- `GET /api/analytics/campaigns/{id}` - Аналитика кампании
- `GET /api/analytics/leads/{id}` - История взаимодействий с лидом

## Workflow

### Типичный процесс работы:

1. **Поиск лидов**
   - Пользователь задает критерии поиска
   - Система ищет лиды через различные источники
   - Обогащает данные и сохраняет в БД

2. **Создание кампании**
   - Выбор целевых лидов
   - Создание/выбор шаблона письма
   - Настройка параметров отправки

3. **Генерация писем**
   - Для каждого лида генерируется персонализированное письмо
   - Опционально: AI-оптимизация контента

4. **Отправка**
   - Письма добавляются в очередь
   - Постепенная отправка с соблюдением лимитов
   - Трекинг результатов

5. **Аналитика**
   - Мониторинг открытий, кликов, ответов
   - Оптимизация будущих кампаний

## Безопасность и Compliance

- GDPR compliance для обработки персональных данных
- Opt-out механизм (unsubscribe)
- Rate limiting для предотвращения спама
- Шифрование чувствительных данных
- Аудит логи всех операций

## Масштабирование

- Горизонтальное масштабирование сервисов
- Очереди для асинхронной обработки
- Кэширование частых запросов
- CDN для статических ресурсов
- Database sharding при необходимости

## Мониторинг

- Логирование всех операций
- Метрики производительности
- Алерты при ошибках
- Dashboard для мониторинга кампаний
