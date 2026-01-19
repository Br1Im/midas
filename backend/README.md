# Midas Backend

Backend API для системы лидогенерации Midas на FastAPI.

## Установка

### 1. Создать виртуальное окружение

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 2. Установить зависимости

```bash
pip install -r requirements.txt
```

### 3. Настроить базу данных

Создайте PostgreSQL базу данных:

```sql
CREATE DATABASE midas;
```

### 4. Настроить переменные окружения

Скопируйте `.env.example` в `.env` и настройте:

```bash
cp .env.example .env
```

Отредактируйте `.env` с вашими настройками.

### 5. Создать таблицы

Таблицы создаются автоматически при запуске приложения.

## Запуск

```bash
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

API будет доступен на http://localhost:8000

## Документация API

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Endpoints

### Leads
- `GET /api/leads` - Список лидов
- `GET /api/leads/{id}` - Получить лида
- `POST /api/leads` - Создать лида
- `PUT /api/leads/{id}` - Обновить лида
- `DELETE /api/leads/{id}` - Удалить лида
- `POST /api/leads/search` - Поиск лидов

### Campaigns
- `GET /api/campaigns` - Список кампаний
- `GET /api/campaigns/{id}` - Получить кампанию
- `POST /api/campaigns` - Создать кампанию
- `PUT /api/campaigns/{id}` - Обновить кампанию
- `POST /api/campaigns/{id}/send` - Запустить кампанию
- `GET /api/campaigns/{id}/stats` - Статистика кампании

### Templates
- `GET /api/templates` - Список шаблонов
- `GET /api/templates/{id}` - Получить шаблон
- `POST /api/templates` - Создать шаблон
- `PUT /api/templates/{id}` - Обновить шаблон
- `DELETE /api/templates/{id}` - Удалить шаблон

## Структура проекта

```
backend/
├── src/
│   ├── api/
│   │   └── routes/
│   │       ├── leads.py
│   │       ├── campaigns.py
│   │       └── templates.py
│   ├── models/
│   │   ├── lead.py
│   │   ├── campaign.py
│   │   └── template.py
│   ├── schemas/
│   │   ├── lead.py
│   │   ├── campaign.py
│   │   └── template.py
│   ├── config.py
│   ├── database.py
│   └── main.py
├── requirements.txt
├── .env.example
└── README.md
```

## Разработка

### Добавление новых моделей

1. Создайте модель в `src/models/`
2. Создайте схемы в `src/schemas/`
3. Создайте роуты в `src/api/routes/`
4. Подключите роутер в `src/main.py`

### Миграции (опционально)

Для продакшена рекомендуется использовать Alembic для миграций:

```bash
alembic init alembic
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```
