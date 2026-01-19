@echo off
echo ========================================
echo Запуск Chrome для парсера 2GIS
echo ========================================
echo.

REM Закрываем все процессы Chrome
taskkill /F /IM chrome.exe 2>nul
timeout /t 2 /nobreak >nul

REM Создаем папку для профиля Chrome
if not exist "%TEMP%\chrome-debug" mkdir "%TEMP%\chrome-debug"

echo Запускаем Chrome в режиме отладки...
echo Порт: 9222
echo.
echo ВАЖНО: Не закрывайте это окно Chrome!
echo.

REM Запускаем Chrome с параметрами отладки
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="%TEMP%\chrome-debug" --disable-web-security --disable-features=IsolateOrigins,site-per-process

echo.
echo Chrome запущен!
echo Теперь можно запускать бэкенд и парсить лиды.
echo.
pause
