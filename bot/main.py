"""
Telegram бот для SMM агентства Midas
Генерация контента, планирование постов, аналитика
"""
import os
import logging
from aiogram import Bot, Dispatcher, F
from aiogram.filters import Command, StateFilter
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.types import Message, CallbackQuery
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from dotenv import load_dotenv

from keyboards.main import (
    get_main_keyboard,
    get_start_keyboard,
    get_content_menu,
    get_post_types_keyboard,
    get_tone_keyboard,
    get_platform_keyboard
)

# Загрузка переменных окружения
load_dotenv()

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Инициализация бота
BOT_TOKEN = os.getenv("BOT_TOKEN")
if not BOT_TOKEN:
    raise ValueError("BOT_TOKEN не найден в .env файле")

storage = MemoryStorage()
bot = Bot(token=BOT_TOKEN)
dp = Dispatcher(storage=storage)


# Состояния для FSM
class ContentGeneration(StatesGroup):
    waiting_for_topic = State()
    waiting_for_details = State()
    selecting_tone = State()
    selecting_platform = State()


class PostSchedule(StatesGroup):
    waiting_for_text = State()
    waiting_for_datetime = State()
    waiting_for_platform = State()


@dp.message(Command("start"))
async def cmd_start(message: Message):
    """Обработчик команды /start"""
    photo_path = os.path.join(os.path.dirname(__file__), "hi.png")
    
    welcome_text = (
        "🟡 <b>MIDAS AI ENGINE</b> 🟡\n\n"
        "Автоматизация контент-маркетинга.\n"
        "Ваш бренд в надёжных руках.\n\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n\n"
        "<b>ВОЗМОЖНОСТИ:</b>\n\n"
        "▫️ AI-генерация контента\n"
        "▫️ Контент-планирование\n"
        "▫️ Аналитика в реальном времени\n"
        "▫️ Автопостинг в соцсети\n"
        "▫️ Генерация изображений\n\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n\n"
        "Выберите действие ⬇️"
    )
    
    if os.path.exists(photo_path):
        from aiogram.types import FSInputFile
        photo = FSInputFile(photo_path)
        await message.answer_photo(
            photo=photo,
            caption=welcome_text,
            parse_mode="HTML",
            reply_markup=get_start_keyboard()
        )
    else:
        await message.answer(
            welcome_text,
            parse_mode="HTML",
            reply_markup=get_start_keyboard()
        )


@dp.callback_query(F.data == "my_profile")
async def callback_my_profile(callback: CallbackQuery):
    """Обработчик кнопки Мой профиль"""
    user = callback.from_user
    user_id = user.id
    username = user.username or "Не указан"
    first_name = user.first_name or ""
    last_name = user.last_name or ""
    full_name = f"{first_name} {last_name}".strip() or "Не указано"
    
    # TODO: В будущем здесь будет проверка в базе данных
    # Пока все пользователи считаются бесплатными
    subscription_status = "❌ Не активна"
    subscription_plan = "Бесплатный"
    posts_left = "0 из 0"
    valid_until = "—"
    
    profile_text = f"""
🟡 <b>МОЙ ПРОФИЛЬ</b> 🟡

━━━━━━━━━━━━━━━━━━━━━━

<b>Личные данные:</b>

👤 Имя: {full_name}
🆔 ID: <code>{user_id}</code>
📱 Username: @{username}

━━━━━━━━━━━━━━━━━━━━━━

<b>Подписка:</b>

💎 Тариф: <b>{subscription_plan}</b>
📊 Статус: {subscription_status}
📝 Лимит контента: {posts_left}
📅 Действует до: {valid_until}

━━━━━━━━━━━━━━━━━━━━━━

<b>Статистика создания:</b>

📝 Текстовые посты: 0
🎬 Short-видео: 0
📹 Видео-сценарии: 0
🖼 Изображения: 0
✍️ Описания профилей: 0
📊 Контент-планы: 0

━━━━━━━━━━━━━━━━━━━━━━

<b>Общие показатели:</b>

⚡️ Всего контента: 0
📈 Символов написано: 0
🎯 Платформ охвачено: 0
⏱ Времени сэкономлено: 0 ч

━━━━━━━━━━━━━━━━━━━━━━

💡 Подключите тариф для доступа к функциям!
"""
    
    await callback.message.delete()
    await callback.message.answer(
        profile_text,
        parse_mode="HTML",
        reply_markup=InlineKeyboardMarkup(
            inline_keyboard=[
                [
                    InlineKeyboardButton(
                        text="💎 Выбрать тариф",
                        callback_data="pricing"
                    )
                ],
                [
                    InlineKeyboardButton(
                        text="💬 Связаться с поддержкой",
                        callback_data="support"
                    )
                ],
                [
                    InlineKeyboardButton(
                        text="« Назад",
                        callback_data="back_to_start"
                    )
                ]
            ]
        )
    )
    await callback.answer()


@dp.callback_query(F.data == "about_us")
async def callback_about_us(callback: CallbackQuery):
    """Обработчик кнопки О нас"""
    about_text = """
🟡 <b>О НАС</b> 🟡

━━━━━━━━━━━━━━━━━━━━━━

<b>MIDAS AI ENGINE</b> — это премиальная платформа для автоматизации контент-маркетинга.

<b>Что мы делаем:</b>

▫️ Генерируем уникальный контент с помощью AI
▫️ Создаём контент-планы для соцсетей
▫️ Анализируем эффективность постов
▫️ Автоматизируем публикации
▫️ Генерируем изображения для постов

━━━━━━━━━━━━━━━━━━━━━━

<b>Наши преимущества:</b>

✓ Экономия времени до 80%
✓ Профессиональный контент
✓ Поддержка всех соцсетей
✓ Аналитика в реальном времени
✓ Техподдержка 24/7

━━━━━━━━━━━━━━━━━━━━━━

Присоединяйтесь к тысячам довольных клиентов!
"""
    
    # Удаляем старое сообщение и отправляем новое
    await callback.message.delete()
    await callback.message.answer(
        about_text,
        parse_mode="HTML",
        reply_markup=InlineKeyboardMarkup(
            inline_keyboard=[
                [
                    InlineKeyboardButton(
                        text="💎 Посмотреть тарифы",
                        callback_data="pricing"
                    )
                ],
                [
                    InlineKeyboardButton(
                        text="« Назад",
                        callback_data="back_to_start"
                    )
                ]
            ]
        )
    )
    await callback.answer()


@dp.callback_query(F.data == "pricing")
async def callback_pricing(callback: CallbackQuery):
    """Обработчик кнопки Тарифы"""
    pricing_text = """
🟡 <b>ТАРИФЫ</b> 🟡

━━━━━━━━━━━━━━━━━━━━━━

⚠️ <b>ВНИМАНИЕ!</b>
Цены действуют до конца месяца
После повышение на 40%

━━━━━━━━━━━━━━━━━━━━━━

<b>БАЗОВЫЙ</b> 💼
<b>1,490₽/месяц</b>
<s>Скоро: 2,090₽</s>

▫️ 50 постов в месяц
▫️ AI-генерация текста
▫️ 3 соцсети
▫️ Базовая аналитика
▫️ Email поддержка

━━━━━━━━━━━━━━━━━━━━━━

<b>ПРОФЕССИОНАЛЬНЫЙ</b> ⭐️
<b>3,490₽/месяц</b>
<s>Скоро: 4,890₽</s>

▫️ 200 постов в месяц
▫️ AI-генерация текста + изображений
▫️ Все соцсети
▫️ Расширенная аналитика
▫️ Контент-планирование
▫️ Приоритетная поддержка

━━━━━━━━━━━━━━━━━━━━━━

<b>БИЗНЕС</b> 💎
<b>6,990₽/месяц</b>
<s>Скоро: 9,790₽</s>

▫️ Безлимитные посты
▫️ AI-генерация всех типов контента
▫️ Все соцсети + автопостинг
▫️ Полная аналитика + отчёты
▫️ Персональный менеджер
▫️ Поддержка 24/7
▫️ API доступ

━━━━━━━━━━━━━━━━━━━━━━

🔥 <b>Успейте подключиться по старой цене!</b>
"""
    
    # Удаляем старое сообщение и отправляем новое
    await callback.message.delete()
    await callback.message.answer(
        pricing_text,
        parse_mode="HTML",
        reply_markup=InlineKeyboardMarkup(
            inline_keyboard=[
                [
                    InlineKeyboardButton(
                        text="💬 Связаться с менеджером",
                        callback_data="support"
                    )
                ],
                [
                    InlineKeyboardButton(
                        text="« Назад",
                        callback_data="back_to_start"
                    )
                ]
            ]
        )
    )
    await callback.answer()


@dp.callback_query(F.data == "support")
async def callback_support(callback: CallbackQuery):
    """Обработчик кнопки Поддержка"""
    support_text = """
🟡 <b>ПОДДЕРЖКА</b> 🟡

━━━━━━━━━━━━━━━━━━━━━━

<b>Мы всегда на связи!</b>

<b>Способы связи:</b>

📧 Email: support@midas-ai.com
💬 Telegram: @midas_support
📱 WhatsApp: +7 (999) 123-45-67
🌐 Сайт: midas-ai.com

━━━━━━━━━━━━━━━━━━━━━━

<b>Время работы:</b>

Пн-Пт: 09:00 - 21:00 (МСК)
Сб-Вс: 10:00 - 18:00 (МСК)

<b>Для клиентов тарифа БИЗНЕС:</b>
Поддержка 24/7 без выходных

━━━━━━━━━━━━━━━━━━━━━━

<b>Часто задаваемые вопросы:</b>

❓ Как начать работу?
Выберите тариф и получите 7 дней бесплатно

❓ Можно ли сменить тариф?
Да, в любой момент

❓ Есть ли возврат средств?
Да, в течение 14 дней

━━━━━━━━━━━━━━━━━━━━━━

Напишите нам, мы поможем!
"""
    
    # Удаляем старое сообщение и отправляем новое
    await callback.message.delete()
    await callback.message.answer(
        support_text,
        parse_mode="HTML",
        reply_markup=InlineKeyboardMarkup(
            inline_keyboard=[
                [
                    InlineKeyboardButton(
                        text="💎 Посмотреть тарифы",
                        callback_data="pricing"
                    )
                ],
                [
                    InlineKeyboardButton(
                        text="« Назад",
                        callback_data="back_to_start"
                    )
                ]
            ]
        )
    )
    await callback.answer()


@dp.callback_query(F.data == "generation_center")
async def callback_generation_center(callback: CallbackQuery):
    """Обработчик центра генерации"""
    await callback.message.edit_text(
        "🟡 <b>ЦЕНТР ГЕНЕРАЦИИ</b> 🟡\n\n"
        "Выберите тип контента:\n\n"
        "━━━━━━━━━━━━━━━━━━━━━━",
        parse_mode="HTML",
        reply_markup=get_content_menu()
    )
    await callback.answer()


@dp.callback_query(F.data == "back_to_start")
async def callback_back_to_start(callback: CallbackQuery):
    """Возврат в главное меню"""
    photo_path = os.path.join(os.path.dirname(__file__), "hi.png")
    
    welcome_text = (
        "🟡 <b>MIDAS AI ENGINE</b> 🟡\n\n"
        "Автоматизация контент-маркетинга.\n"
        "Ваш бренд в надёжных руках.\n\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n\n"
        "<b>ВОЗМОЖНОСТИ:</b>\n\n"
        "▫️ AI-генерация контента\n"
        "▫️ Контент-планирование\n"
        "▫️ Аналитика в реальном времени\n"
        "▫️ Автопостинг в соцсети\n"
        "▫️ Генерация изображений\n\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n\n"
        "Выберите действие ⬇️"
    )
    
    # Удаляем старое сообщение
    await callback.message.delete()
    
    # Отправляем новое с фото
    if os.path.exists(photo_path):
        from aiogram.types import FSInputFile
        photo = FSInputFile(photo_path)
        await callback.message.answer_photo(
            photo=photo,
            caption=welcome_text,
            parse_mode="HTML",
            reply_markup=get_start_keyboard()
        )
    else:
        await callback.message.answer(
            welcome_text,
            parse_mode="HTML",
            reply_markup=get_start_keyboard()
        )
    
    await callback.answer()


@dp.callback_query(F.data == "content_plan")
async def callback_content_plan(callback: CallbackQuery):
    """Обработчик кнопки контент-плана"""
    await callback.message.answer(
        "📅 <b>Контент-план на неделю</b>\n\n"
        "🔄 Генерирую план...",
        parse_mode="HTML"
    )
    
    plan = """
📅 <b>Контент-план на неделю</b>

<b>Понедельник</b> 🌅
09:00 - Мотивационный пост
15:00 - Обучающий материал
19:00 - Stories с опросом

<b>Вторник</b> 💼
10:00 - Кейс клиента
14:00 - Полезный совет
20:00 - Развлекательный контент

<b>Среда</b> 🎯
09:00 - Новость индустрии
16:00 - Инфографика
21:00 - Вопрос аудитории

<b>Четверг</b> 📊
10:00 - Статистика/Факты
15:00 - Behind the scenes
19:00 - Конкурс/Розыгрыш

<b>Пятница</b> 🎉
09:00 - Итоги недели
14:00 - Пятничный лайфхак
20:00 - Развлекательный пост

<b>Суббота</b> 🌟
11:00 - Вдохновляющая история
17:00 - Подборка/Топ-5

<b>Воскресенье</b> 😌
12:00 - Воскресный пост
18:00 - Анонс недели

━━━━━━━━━━━━━━━━
📊 Всего постов: 21
⏰ Оптимальное время
🎯 Разнообразный контент
"""
    
    await callback.message.answer(plan, parse_mode="HTML")
    await callback.answer()


@dp.callback_query(F.data == "post_ideas")
async def callback_post_ideas(callback: CallbackQuery):
    """Обработчик кнопки идей"""
    await callback.message.answer(
        "💡 <b>Идеи для постов</b>\n\n"
        "🔄 Генерирую идеи...",
        parse_mode="HTML"
    )
    
    ideas = """
💡 <b>10 идей для постов</b>

1️⃣ <b>До/После</b>
Покажите трансформацию клиента

2️⃣ <b>Закулисье</b>
Как создаётся ваш продукт

3️⃣ <b>Ошибки новичков</b>
Топ-5 ошибок в вашей нише

4️⃣ <b>Мифы vs Реальность</b>
Развенчайте популярные мифы

5️⃣ <b>Инструменты</b>
Что вы используете в работе

6️⃣ <b>Истории клиентов</b>
Реальные отзывы и кейсы

7️⃣ <b>Чек-лист</b>
Пошаговая инструкция

8️⃣ <b>Вопрос-ответ</b>
FAQ от аудитории

9️⃣ <b>Тренды</b>
Что актуально сейчас

🔟 <b>Личное</b>
Ваша история успеха

━━━━━━━━━━━━━━━━
💬 Выберите идею и создайте пост
"""
    
    await callback.message.answer(ideas, parse_mode="HTML")
    await callback.answer()


@dp.callback_query(F.data == "analytics")
async def callback_analytics(callback: CallbackQuery):
    """Обработчик кнопки аналитики"""
    stats = """
📊 <b>Аналитика за неделю</b>

<b>Охваты</b> 📈
Всего: 15,240 (+23%)
Уникальные: 12,890 (+18%)

<b>Вовлечённость</b> 💬
Лайки: 1,234 (+15%)
Комментарии: 156 (+28%)
Репосты: 89 (+12%)
Сохранения: 234 (+45%)

<b>Лучшие посты</b> ⭐️
1. Обучающий пост - 2.3K охватов
2. Кейс клиента - 1.8K охватов
3. Мотивация - 1.5K охватов

<b>Лучшее время</b> ⏰
Утро: 09:00-11:00
Вечер: 19:00-21:00

<b>Рекомендации</b> 💡
• Больше обучающего контента
• Публиковать в 9:00 и 19:00
• Добавить больше Stories
"""
    
    await callback.message.answer(stats, parse_mode="HTML")
    await callback.answer()


@dp.callback_query(F.data == "settings")
async def callback_settings(callback: CallbackQuery):
    """Обработчик кнопки настроек"""
    settings_text = """
⚙️ <b>Настройки</b>

<b>Текущие настройки:</b>
🌐 Язык: Русский
🎨 Стиль: Профессиональный
📱 Платформы: Instagram, VK, Telegram
⏰ Часовой пояс: UTC+3

<b>Доступные команды:</b>
/language - Изменить язык
/style - Изменить стиль
/platforms - Настроить платформы
/timezone - Часовой пояс
"""
    
    await callback.message.answer(settings_text, parse_mode="HTML")
    await callback.answer()


@dp.message(F.text == "📝 Генерация контента")
async def content_generation_menu(message: Message):
    """Меню генерации контента"""
    await message.answer(
        "🟡 <b>ГЕНЕРАЦИЯ КОНТЕНТА</b> 🟡\n\n"
        "Выберите тип контента для создания:\n\n"
        "━━━━━━━━━━━━━━━━━━━━━━",
        parse_mode="HTML",
        reply_markup=get_content_menu()
    )


@dp.callback_query(F.data == "generate_post")
async def start_post_generation(callback: CallbackQuery, state: FSMContext):
    """Начало генерации поста"""
    await callback.message.edit_text(
        "🟡 <b>СОЗДАНИЕ ПОСТА</b> 🟡\n\n"
        "ШАГ 1/4\n"
        "Выберите тип контента:\n\n"
        "━━━━━━━━━━━━━━━━━━━━━━",
        parse_mode="HTML",
        reply_markup=get_post_types_keyboard()
    )
    await callback.answer()


@dp.callback_query(F.data.startswith("post_type:"))
async def select_post_type(callback: CallbackQuery, state: FSMContext):
    """Выбор типа поста"""
    post_type = callback.data.split(":")[1]
    await state.update_data(post_type=post_type)
    
    post_types = {
        "promo": "Рекламный",
        "educational": "Обучающий",
        "entertaining": "Развлекательный",
        "news": "Новостной",
        "story": "История/Кейс"
    }
    
    await callback.message.edit_text(
        f"🟡 <b>СОЗДАНИЕ ПОСТА</b> 🟡\n\n"
        f"ШАГ 2/4\n\n"
        f"Тип: <b>{post_types.get(post_type, post_type)}</b>\n\n"
        f"━━━━━━━━━━━━━━━━━━━━━━\n\n"
        f"Напишите тему или ключевые слова:",
        parse_mode="HTML"
    )
    await state.set_state(ContentGeneration.waiting_for_topic)
    await callback.answer()


@dp.message(ContentGeneration.waiting_for_topic)
async def process_topic(message: Message, state: FSMContext):
    """Обработка темы поста"""
    await state.update_data(topic=message.text)
    
    await message.answer(
        "🟡 <b>СОЗДАНИЕ ПОСТА</b> 🟡\n\n"
        "ШАГ 3/4\n\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n\n"
        "Выберите тон коммуникации:",
        parse_mode="HTML",
        reply_markup=get_tone_keyboard()
    )
    await state.set_state(ContentGeneration.selecting_tone)


@dp.callback_query(ContentGeneration.selecting_tone, F.data.startswith("tone:"))
async def select_tone(callback: CallbackQuery, state: FSMContext):
    """Выбор тона поста"""
    tone = callback.data.split(":")[1]
    await state.update_data(tone=tone)
    
    await callback.message.edit_text(
        "🟡 <b>СОЗДАНИЕ ПОСТА</b> 🟡\n\n"
        "ШАГ 4/4\n\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n\n"
        "Выберите платформу:",
        parse_mode="HTML",
        reply_markup=get_platform_keyboard()
    )
    await state.set_state(ContentGeneration.selecting_platform)
    await callback.answer()


@dp.callback_query(ContentGeneration.selecting_platform, F.data.startswith("platform:"))
async def generate_content(callback: CallbackQuery, state: FSMContext):
    """Генерация контента"""
    platform = callback.data.split(":")[1]
    data = await state.get_data()
    
    await callback.message.edit_text(
        "🟡 <b>ГЕНЕРАЦИЯ...</b> 🟡\n\n"
        "Создаём уникальный контент\n"
        "Подождите несколько секунд",
        parse_mode="HTML"
    )
    
    # Здесь будет интеграция с AI (OpenAI, Claude и т.д.)
    # Пока заглушка
    post_text = f"""
🟡 <b>MIDAS</b> 🟡

━━━━━━━━━━━━━━━━━━━━━━

<b>СГЕНЕРИРОВАННЫЙ КОНТЕНТ</b>

Тема: {data.get('topic')}
Платформа: {platform.upper()}

━━━━━━━━━━━━━━━━━━━━━━

{data.get('topic')} — это ключевой тренд, который меняет правила игры.

▫️ Увеличивает вовлечённость на 300%
▫️ Привлекает целевую аудиторию
▫️ Повышает конверсию продаж

Хотите узнать больше?
Пишите в комментариях ⬇️

━━━━━━━━━━━━━━━━━━━━━━

#midas #smm #маркетинг #контент

━━━━━━━━━━━━━━━━━━━━━━

<b>СТАТИСТИКА:</b>
▫️ Символов: ~250
▫️ Время чтения: 30 сек
▫️ Хештегов: 4
"""
    
    await callback.message.answer(
        post_text,
        parse_mode="HTML"
    )
    
    await callback.message.answer(
        "🟡 <b>ГОТОВО</b> 🟡\n\n"
        "Контент создан успешно.\n\n"
        "━━━━━━━━━━━━━━━━━━━━━━\n\n"
        "Используйте меню для новых действий ⬇️",
        parse_mode="HTML",
        reply_markup=get_main_keyboard()
    )
    
    await state.clear()
    await callback.answer()


@dp.message(F.text == "📅 Контент-план")
async def content_plan(message: Message):
    """Создание контент-плана"""
    await message.answer(
        "📅 <b>Контент-план на неделю</b>\n\n"
        "🔄 Генерирую план...",
        parse_mode="HTML"
    )
    
    plan = """
📅 <b>Контент-план на неделю</b>

<b>Понедельник</b> 🌅
09:00 - Мотивационный пост
15:00 - Обучающий материал
19:00 - Stories с опросом

<b>Вторник</b> 💼
10:00 - Кейс клиента
14:00 - Полезный совет
20:00 - Развлекательный контент

<b>Среда</b> 🎯
09:00 - Новость индустрии
16:00 - Инфографика
21:00 - Вопрос аудитории

<b>Четверг</b> 📊
10:00 - Статистика/Факты
15:00 - Behind the scenes
19:00 - Конкурс/Розыгрыш

<b>Пятница</b> 🎉
09:00 - Итоги недели
14:00 - Пятничный лайфхак
20:00 - Развлекательный пост

<b>Суббота</b> 🌟
11:00 - Вдохновляющая история
17:00 - Подборка/Топ-5

<b>Воскресенье</b> 😌
12:00 - Воскресный пост
18:00 - Анонс недели

━━━━━━━━━━━━━━━━
📊 Всего постов: 21
⏰ Оптимальное время
🎯 Разнообразный контент
"""
    
    await message.answer(plan, parse_mode="HTML")


@dp.message(F.text == "💡 Идеи для постов")
async def post_ideas(message: Message):
    """Генерация идей для постов"""
    await message.answer(
        "💡 <b>Идеи для постов</b>\n\n"
        "🔄 Генерирую идеи...",
        parse_mode="HTML"
    )
    
    ideas = """
💡 <b>10 идей для постов</b>

1️⃣ <b>До/После</b>
Покажите трансформацию клиента

2️⃣ <b>Закулисье</b>
Как создаётся ваш продукт

3️⃣ <b>Ошибки новичков</b>
Топ-5 ошибок в вашей нише

4️⃣ <b>Мифы vs Реальность</b>
Развенчайте популярные мифы

5️⃣ <b>Инструменты</b>
Что вы используете в работе

6️⃣ <b>Истории клиентов</b>
Реальные отзывы и кейсы

7️⃣ <b>Чек-лист</b>
Пошаговая инструкция

8️⃣ <b>Вопрос-ответ</b>
FAQ от аудитории

9️⃣ <b>Тренды</b>
Что актуально сейчас

🔟 <b>Личное</b>
Ваша история успеха

━━━━━━━━━━━━━━━━
💬 Выберите идею и напишите /generate
"""
    
    await message.answer(ideas, parse_mode="HTML")


@dp.message(F.text == "📊 Аналитика")
async def analytics(message: Message):
    """Аналитика постов"""
    stats = """
📊 <b>Аналитика за неделю</b>

<b>Охваты</b> 📈
Всего: 15,240 (+23%)
Уникальные: 12,890 (+18%)

<b>Вовлечённость</b> 💬
Лайки: 1,234 (+15%)
Комментарии: 156 (+28%)
Репосты: 89 (+12%)
Сохранения: 234 (+45%)

<b>Лучшие посты</b> ⭐️
1. Обучающий пост - 2.3K охватов
2. Кейс клиента - 1.8K охватов
3. Мотивация - 1.5K охватов

<b>Лучшее время</b> ⏰
Утро: 09:00-11:00
Вечер: 19:00-21:00

<b>Рекомендации</b> 💡
• Больше обучающего контента
• Публиковать в 9:00 и 19:00
• Добавить больше Stories
"""
    
    await message.answer(stats, parse_mode="HTML")


@dp.message(F.text == "⚙️ Настройки")
async def settings(message: Message):
    """Настройки бота"""
    settings_text = """
⚙️ <b>Настройки</b>

<b>Текущие настройки:</b>
🌐 Язык: Русский
🎨 Стиль: Профессиональный
📱 Платформы: Instagram, VK, Telegram
⏰ Часовой пояс: UTC+3

<b>Доступные команды:</b>
/language - Изменить язык
/style - Изменить стиль
/platforms - Настроить платформы
/timezone - Часовой пояс
"""
    
    await message.answer(settings_text, parse_mode="HTML")


@dp.message(Command("help"))
async def cmd_help(message: Message):
    """Помощь"""
    help_text = """
📖 <b>Помощь по боту</b>

<b>Основные функции:</b>

📝 <b>Генерация контента</b>
Создание постов с помощью AI

📅 <b>Контент-план</b>
Автоматический план на неделю

💡 <b>Идеи для постов</b>
Вдохновение для контента

📊 <b>Аналитика</b>
Статистика ваших постов

⚙️ <b>Настройки</b>
Персонализация бота

<b>Команды:</b>
/start - Главное меню
/help - Эта справка
/generate - Быстрая генерация
/plan - Создать план
/ideas - Получить идеи
/stats - Показать статистику
"""
    
    await message.answer(help_text, parse_mode="HTML")


@dp.message()
async def echo_message(message: Message):
    """Обработчик всех остальных сообщений"""
    await message.answer(
        "Используйте меню ниже или /help для справки 👇",
        reply_markup=get_main_keyboard()
    )


async def main():
    """Запуск бота"""
    logger.info("Запуск SMM бота Midas...")
    await dp.start_polling(bot)


if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
