@echo off
echo ========================================
echo   MIDAS - Lead Generation Platform
echo ========================================
echo.
echo Запуск Docker контейнеров...
echo.

REM Проверка Docker
docker --version >nul 2>&1
if errorlevel 1 (
    echo [ОШИБКА] Docker не установлен!
    echo Установите Docker Desktop: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

REM Остановка старых контейнеров
echo Остановка старых контейнеров...
docker-compose down

REM Сборка и запуск
echo.
echo Сборка и запуск контейнеров...
docker-compose up --build -d

echo.
echo ========================================
echo   Контейнеры запущены!
echo ========================================
echo.
echo Frontend: http://localhost:3001
echo Backend:  http://localhost:8001
echo API Docs: http://localhost:8001/docs
echo.
echo Для просмотра логов:
echo   docker-compose logs -f
echo.
echo Для остановки:
echo   docker-compose down
echo.
pause
