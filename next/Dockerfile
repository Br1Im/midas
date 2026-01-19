FROM node:20-alpine

WORKDIR /app

# Копирование package files
COPY package*.json ./

# Установка зависимостей
RUN npm ci

# Копирование кода
COPY . .

# Переменные окружения
ENV NEXT_PUBLIC_API_URL=http://localhost:8001

# Порт
EXPOSE 3001

# Запуск в dev режиме
CMD ["npm", "run", "dev", "--", "-p", "3001"]
