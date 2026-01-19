# Настройка Chrome для парсера 2GIS

## Проблема

Ошибка `Bound is incorrect` или `No node with given id found` означает, что парсер не может подключиться к Chrome.

## Решение

### Вариант 1: Запуск Chrome в режиме отладки (Рекомендуется)

#### Windows

1. Закройте все окна Chrome
2. Запустите Chrome с параметрами отладки:

```cmd
"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="C:\chrome-debug"
```

3. Оставьте это окно Chrome открытым
4. Запустите бэкенд

#### Linux/Mac

```bash
google-chrome --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-debug
```

### Вариант 2: Использование ChromeDriver

Установите ChromeDriver:

```bash
# Windows (через chocolatey)
choco install chromedriver

# Linux
sudo apt-get install chromium-chromedriver

# Mac
brew install chromedriver
```

### Вариант 3: Изменить настройки парсера

В файле `backend/src/services/parser_service.py` измените:

```python
self.chrome_options = ChromeOptions(
    headless=False,  # Показывать браузер
    silent_browser=False,  # Показывать логи
    disable_images=True,
    chrome_path="C:/Program Files/Google/Chrome/Application/chrome.exe"  # Путь к Chrome
)
```

## Проверка

После запуска Chrome в режиме отладки, проверьте что он доступен:

1. Откройте в браузере: http://localhost:9222/json
2. Должен показаться JSON с информацией о вкладках

## Альтернатива: Использовать готовый URL

Если парсер не работает, можно:

1. Открыть 2GIS в браузере
2. Найти нужные компании
3. Скопировать данные вручную
4. Или использовать API 2GIS (требует ключ)

## Частые ошибки

### "Bound is incorrect"
- Chrome не запущен в режиме отладки
- Неверный URL 2GIS
- Страница не загрузилась полностью

### "No node with given id found"
- Chrome закрылся во время парсинга
- Недостаточно прав доступа
- Антивирус блокирует подключение

## Рекомендации

1. **Не парсить слишком часто** - 2GIS может заблокировать
2. **Делать паузы** между запросами (минимум 30 сек)
3. **Парсить небольшими порциями** (50-100 записей)
4. **Использовать VPN** если получаете блокировки

## Тестирование

Запустите тест:

```bash
cd backend
python test_parser_simple.py
```

Если все тесты прошли ✓ - парсер настроен правильно.
