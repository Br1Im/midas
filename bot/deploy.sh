#!/bin/bash

# Скрипт для быстрого деплоя бота на сервер
# Использование: ./deploy.sh

SERVER="85.192.56.74"
BOT_DIR="/opt/midas-bot"

echo "🚀 Деплой Midas Bot на сервер $SERVER"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Загрузка файлов на сервер
echo "📦 Загрузка файлов..."
scp -r ../bot root@$SERVER:$BOT_DIR/

# Подключение к серверу и выполнение команд
echo "⚙️ Настройка на сервере..."
ssh root@$SERVER << 'ENDSSH'
cd /opt/midas-bot/bot

# Создание виртуального окружения если его нет
if [ ! -d "venv" ]; then
    echo "📦 Создание виртуального окружения..."
    python3 -m venv venv
fi

# Активация и установка зависимостей
source venv/bin/activate
pip install -r requirements.txt

# Перезапуск бота
echo "🔄 Перезапуск бота..."
systemctl restart midas-bot

# Проверка статуса
echo "✅ Статус бота:"
systemctl status midas-bot --no-pager

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Деплой завершен!"
echo "📊 Просмотр логов: journalctl -u midas-bot -f"
ENDSSH

echo ""
echo "✅ Деплой завершен успешно!"
