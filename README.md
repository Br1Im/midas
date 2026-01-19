# Midas - Lead Generation Platform

Платформа для автоматической генерации лидов с парсингом 2GIS.

## 🚀 Быстрый старт с Docker

### Требования

- Docker Desktop для Windows
- 4GB RAM минимум

### Установка Docker

1. Скачайте Docker Desktop: https://www.docker.com/products/docker-desktop
2. Установите и запустите Docker Desktop
3. Дождитесь полного запуска Docker

### Запуск проекта

```bash
# Просто запустите start.bat
start.bat
```

Или вручную:

```bash
docker-compose up --build -d
```

### Доступ к приложению

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:8001
- **API Docs**: http://localhost:8001/docs

### Остановка

```bash
# Запустите stop.bat
stop.bat
```

Или вручную:

```bash
docker-compose down
```

## 📦 Что включено

- ✅ FastAPI бэкенд с SQLite
- ✅ Next.js 14 фронтенд
- ✅ Парсер 2GIS с Chrome в Docker
- ✅ Автоматическая настройка окружения
- ✅ Hot reload для разработки

## 🔍 Функции

### Поиск лидов (2GIS Parser)
- Парсинг компаний из 2GIS
- 65+ городов России
- 20+ популярных рубрик
- Свои рубрики и URL
- Автосохранение в БД

### Управление лидами
- Просмотр всех лидов
- Фильтрация по статусу
- Оценка качества лидов
- История взаимодействий

### Email кампании
- Создание кампаний
- Шаблоны писем
- Отслеживание статистики
- Автоматическая отправка

### Аналитика
- Конверсия лидов
- Эффективность кампаний
- Графики и метрики
- Экспорт данных

## 🛠️ Разработка без Docker

### Backend

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn src.main:app --reload --port 8001
```

### Frontend

```bash
cd next
npm install
npm run dev
```

## 📝 Структура проекта

```
midas/
├── backend/           # FastAPI бэкенд
│   ├── src/
│   │   ├── api/      # API endpoints
│   │   ├── models/   # SQLAlchemy модели
│   │   ├── schemas/  # Pydantic схемы
│   │   ├── services/ # Бизнес-логика
│   │   └── parser_2gis/ # Парсер 2GIS
│   └── Dockerfile
├── next/             # Next.js фронтенд
│   ├── src/
│   │   ├── app/     # Страницы (App Router)
│   │   ├── components/ # React компоненты
│   │   ├── lib/     # API клиент
│   │   └── hooks/   # React hooks
│   └── Dockerfile
├── docker-compose.yml
├── start.bat         # Запуск проекта
└── stop.bat          # Остановка проекта
```

## 🎨 Дизайн

- Тёмная тема с золотыми акцентами
- Glassmorphism эффекты
- Плавные анимации (Framer Motion)
- Адаптивный дизайн (mobile-first)

## 🔧 Технологии

### Backend
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic
- Parser-2GIS

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Axios

## 📚 Документация

- [Архитектура](ARCHITECTURE.md)
- [Структура проекта](PROJECT_STRUCTURE.md)
- [Настройка парсера](backend/PARSER_SETUP.md)
- [Настройка Chrome](backend/CHROME_SETUP.md)

## ⚠️ Важно

1. **Docker обязателен** для работы парсера (Chrome в контейнере)
2. **Не парсить слишком часто** - 2GIS может заблокировать
3. **Делать паузы** между запросами (минимум 30 сек)
4. **Парсить небольшими порциями** (50-100 записей)

## 🐛 Решение проблем

### Docker не запускается
- Убедитесь что Docker Desktop запущен
- Проверьте что виртуализация включена в BIOS
- Перезапустите Docker Desktop

### Парсер не работает
- Проверьте логи: `docker-compose logs backend`
- Убедитесь что Chrome установлен в контейнере
- Попробуйте уменьшить количество записей

### Frontend не подключается к Backend
- Проверьте что оба контейнера запущены: `docker ps`
- Проверьте переменную NEXT_PUBLIC_API_URL
- Перезапустите контейнеры: `docker-compose restart`

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи: `docker-compose logs -f`
2. Перезапустите контейнеры: `docker-compose restart`
3. Пересоберите: `docker-compose up --build -d`

## 📄 Лицензия

MIT
