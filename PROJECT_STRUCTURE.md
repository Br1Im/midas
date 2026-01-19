# Структура проекта Midas

## Рекомендуемая структура директорий

```
midas/
├── backend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── leads.py
│   │   │   │   ├── campaigns.py
│   │   │   │   ├── templates.py
│   │   │   │   └── analytics.py
│   │   │   └── middleware/
│   │   ├── services/
│   │   │   ├── lead_discovery/
│   │   │   │   ├── scrapers/
│   │   │   │   ├── api_clients/
│   │   │   │   └── enrichment.py
│   │   │   ├── email_generation/
│   │   │   │   ├── templates.py
│   │   │   │   ├── ai_generator.py
│   │   │   │   └── personalizer.py
│   │   │   └── email_sending/
│   │   │       ├── smtp_client.py
│   │   │       ├── tracking.py
│   │   │       └── queue_manager.py
│   │   ├── models/
│   │   │   ├── lead.py
│   │   │   ├── campaign.py
│   │   │   ├── email.py
│   │   │   └── template.py
│   │   ├── database/
│   │   │   ├── connection.py
│   │   │   └── migrations/
│   │   ├── utils/
│   │   │   ├── validators.py
│   │   │   ├── logger.py
│   │   │   └── helpers.py
│   │   └── config/
│   │       └── settings.py
│   ├── tests/
│   ├── requirements.txt
│   └── main.py
│
├── frontend/ (опционально)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
│
├── database/
│   ├── schema.sql
│   └── migrations/
│
├── docker/
│   ├── Dockerfile.backend
│   ├── Dockerfile.worker
│   └── docker-compose.yml
│
├── scripts/
│   ├── setup.sh
│   └── deploy.sh
│
├── docs/
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── USER_GUIDE.md
│
├── .env.example
├── .gitignore
├── README.md
└── ARCHITECTURE.md
```

## Технологический стек

### Backend (Python)
- **Framework**: FastAPI
- **ORM**: SQLAlchemy
- **Task Queue**: Celery + Redis
- **Email**: python-email, sendgrid
- **Scraping**: BeautifulSoup4, Scrapy, Playwright
- **AI**: OpenAI API, Anthropic Claude
- **Validation**: Pydantic

### Database
- **Primary**: PostgreSQL
- **Cache**: Redis
- **Search**: Elasticsearch (опционально)

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose / Kubernetes
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus + Grafana

## Этапы разработки

### Phase 1: MVP (Минимальный функционал)
1. Базовая структура проекта
2. Database schema и модели
3. API для управления лидами (CRUD)
4. Простой email sender
5. Базовые шаблоны писем

### Phase 2: Core Features
1. Lead discovery сервис
2. AI-генерация писем
3. Campaign management
4. Email tracking
5. Базовая аналитика

### Phase 3: Advanced Features
1. Продвинутая аналитика
2. A/B тестирование
3. Автоматизация workflows
4. Интеграции с CRM
5. Web UI (dashboard)

### Phase 4: Scale & Optimize
1. Оптимизация производительности
2. Масштабирование инфраструктуры
3. Advanced AI features
4. Multi-tenancy
5. API для интеграций

## Следующие шаги

1. Выбрать технологический стек (Python/Node.js)
2. Настроить базовую структуру проекта
3. Создать database schema
4. Реализовать базовые API endpoints
5. Интегрировать первый источник лидов
