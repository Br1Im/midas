# Перезапуск после изменения Tailwind конфигурации

После изменения `tailwind.config.ts` необходимо перезапустить dev сервер.

## Шаги:

1. **Остановите текущий сервер:**
   - Нажмите `Ctrl+C` в терминале где запущен `npm run dev`

2. **Запустите снова:**
   ```bash
   npm run dev
   ```

3. **Очистите кэш браузера:**
   - Откройте DevTools (F12)
   - Нажмите правой кнопкой на кнопку обновления
   - Выберите "Очистить кэш и жесткая перезагрузка"

## Если ошибка сохраняется:

```bash
# Удалите .next папку и node_modules/.cache
rm -rf .next
rm -rf node_modules/.cache

# Перезапустите
npm run dev
```

## Проверка:

После перезапуска все классы из `tailwind.config.ts` должны работать:
- `shadow-gold-sm`
- `shadow-gold`
- `shadow-gold-lg`
- `bg-gradient-gold`
- `bg-gradient-radial`
- И другие кастомные классы
