@echo off
echo ========================================
echo   Запуск Telegram бота Midas
echo ========================================
echo.

REM Проверка наличия hi.png
if not exist "hi.png" (
    echo [ВНИМАНИЕ] Файл hi.png не найден!
    echo Поместите изображение hi.png в папку bot/
    echo.
    echo Бот запустится без изображения...
    timeout /t 3 /nobreak >nul
)

REM Проверка .env
if not exist ".env" (
    echo [ОШИБКА] Файл .env не найден!
    echo Создайте файл .env на основе .env.example
    pause
    exit /b 1
)

echo Запуск бота...
python main.py

pause
