FROM python:3.11-slim

# Установка зависимостей для Chrome
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    unzip \
    curl \
    ca-certificates \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/google-chrome-keyring.gpg \
    && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/google-chrome-keyring.gpg] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

# Установка рабочей директории
WORKDIR /app

# Копирование requirements
COPY requirements.txt .

# Установка Python зависимостей
RUN pip install --no-cache-dir -r requirements.txt

# Копирование кода
COPY . .

# Создание директории для базы данных
RUN mkdir -p /app/data

# Переменные окружения
ENV PYTHONUNBUFFERED=1
ENV DATABASE_URL=sqlite:///./data/midas.db

# Порт
EXPOSE 8001

# Запуск приложения
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8001", "--reload"]
