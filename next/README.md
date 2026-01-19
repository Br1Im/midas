# Midas Frontend

Фронтенд приложение для системы лидогенерации Midas, построенное на Next.js 14.

## Технологии

- **Next.js 14** - React фреймворк с App Router
- **TypeScript** - типизация
- **Tailwind CSS** - стилизация
- **Lucide React** - иконки
- **Axios** - HTTP клиент
- **React Hook Form** - работа с формами
- **Zustand** - state management

## Установка

```bash
npm install
```

## Запуск

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

Приложение будет доступно на http://localhost:3000

## Структура проекта

```
next/
├── src/
│   ├── app/              # App Router страницы
│   │   ├── page.tsx      # Дашборд
│   │   ├── leads/        # Управление лидами
│   │   ├── campaigns/    # Кампании
│   │   ├── templates/    # Шаблоны писем
│   │   ├── analytics/    # Аналитика
│   │   └── settings/     # Настройки
│   ├── components/       # React компоненты
│   │   └── layout/       # Layout компоненты
│   ├── lib/              # Утилиты и API клиент
│   └── types/            # TypeScript типы
├── public/               # Статические файлы
└── package.json
```

## Основные страницы

- `/` - Дашборд с общей статистикой
- `/leads` - Список и управление лидами
- `/campaigns` - Email кампании
- `/templates` - Шаблоны писем
- `/analytics` - Детальная аналитика
- `/settings` - Настройки системы

## API интеграция

API клиент находится в `src/lib/api.ts`. По умолчанию подключается к `http://localhost:8000`.

Настройте переменную окружения в `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Разработка

Проект использует:
- ESLint для линтинга
- TypeScript для проверки типов
- Tailwind CSS для стилей

Все компоненты используют TypeScript и следуют best practices Next.js 14.
