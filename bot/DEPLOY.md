# Деплой бота на сервер 85.192.56.74

## Шаг 1: Подключение к серверу

```bash
ssh root@85.192.56.74
```

## Шаг 2: Установка зависимостей

```bash
# Обновление системы
apt update && apt upgrade -y

# Установка Python и pip
apt install python3 python3-pip python3-venv git -y

# Установка screen для фонового запуска
apt install screen -y
```

## Шаг 3: Создание директории и загрузка кода

```bash
# Создание директории
mkdir -p /opt/midas-bot
cd /opt/midas-bot

# Клонирование репозитория (или загрузка файлов)
git clone https://github.com/Br1Im/midas.git .
# ИЛИ загрузите файлы через scp/sftp
```

## Шаг 4: Настройка окружения

```bash
cd /opt/midas-bot/bot

# Создание виртуального окружения
python3 -m venv venv
source venv/bin/activate

# Установка зависимостей
pip install -r requirements.txt

# Настройка .env файла
nano .env
# Добавьте BOT_TOKEN=8726754394:AAHqx2OGYLmXxk4lMZ9bBBm2fpFJqFQ6P38
```

## Шаг 5: Создание systemd сервиса (автозапуск)

```bash
nano /etc/systemd/system/midas-bot.service
```

Содержимое файла:

```ini
[Unit]
Description=Midas SMM Bot
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/midas-bot/bot
Environment="PATH=/opt/midas-bot/bot/venv/bin"
ExecStart=/opt/midas-bot/bot/venv/bin/python /opt/midas-bot/bot/main.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

## Шаг 6: Запуск бота

```bash
# Перезагрузка systemd
systemctl daemon-reload

# Включение автозапуска
systemctl enable midas-bot

# Запуск бота
systemctl start midas-bot

# Проверка статуса
systemctl status midas-bot

# Просмотр логов
journalctl -u midas-bot -f
```

## Управление ботом

```bash
# Остановка
systemctl stop midas-bot

# Перезапуск
systemctl restart midas-bot

# Просмотр логов
journalctl -u midas-bot -n 100

# Просмотр логов в реальном времени
journalctl -u midas-bot -f
```

## Альтернатива: Запуск через screen (временно)

```bash
cd /opt/midas-bot/bot
source venv/bin/activate

# Создание screen сессии
screen -S midas-bot

# Запуск бота
python main.py

# Отключение от screen: Ctrl+A, затем D
# Подключение обратно: screen -r midas-bot
```

## Обновление бота

```bash
cd /opt/midas-bot
git pull
systemctl restart midas-bot
```
