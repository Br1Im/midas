"""Клавиатуры для SMM бота"""
from aiogram.types import (
    ReplyKeyboardMarkup,
    KeyboardButton,
    InlineKeyboardMarkup,
    InlineKeyboardButton
)


def get_main_keyboard() -> ReplyKeyboardMarkup:
    """Главная клавиатура"""
    keyboard = ReplyKeyboardMarkup(
        keyboard=[
            [
                KeyboardButton(text="📝 Генерация контента"),
                KeyboardButton(text="📅 Контент-план")
            ],
            [
                KeyboardButton(text="💡 Идеи для постов"),
                KeyboardButton(text="📊 Аналитика")
            ],
            [
                KeyboardButton(text="⚙️ Настройки")
            ]
        ],
        resize_keyboard=True
    )
    return keyboard


def get_start_keyboard() -> InlineKeyboardMarkup:
    """Клавиатура для приветствия (бесплатная версия)"""
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="👤 Мой профиль",
                    callback_data="my_profile"
                )
            ],
            [
                InlineKeyboardButton(
                    text="ℹ️ О нас",
                    callback_data="about_us"
                ),
                InlineKeyboardButton(
                    text="💎 Тарифы",
                    callback_data="pricing"
                )
            ],
            [
                InlineKeyboardButton(
                    text="💬 Поддержка",
                    callback_data="support"
                )
            ]
        ]
    )
    return keyboard


def get_content_menu() -> InlineKeyboardMarkup:
    """Меню генерации контента"""
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="📝 Текстовый пост",
                    callback_data="generate_post"
                )
            ],
            [
                InlineKeyboardButton(
                    text="🖼 Пост с изображением",
                    callback_data="generate_image_post"
                )
            ],
            [
                InlineKeyboardButton(
                    text="📹 Reels / Stories",
                    callback_data="generate_reels"
                )
            ],
            [
                InlineKeyboardButton(
                    text="✍️ Описание профиля",
                    callback_data="generate_description"
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
    return keyboard


def get_post_types_keyboard() -> InlineKeyboardMarkup:
    """Клавиатура типов постов"""
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="🎯 Рекламный",
                    callback_data="post_type:promo"
                ),
                InlineKeyboardButton(
                    text="📚 Обучающий",
                    callback_data="post_type:educational"
                )
            ],
            [
                InlineKeyboardButton(
                    text="🎉 Развлекательный",
                    callback_data="post_type:entertaining"
                ),
                InlineKeyboardButton(
                    text="📰 Новостной",
                    callback_data="post_type:news"
                )
            ],
            [
                InlineKeyboardButton(
                    text="📖 История/Кейс",
                    callback_data="post_type:story"
                )
            ]
        ]
    )
    return keyboard


def get_tone_keyboard() -> InlineKeyboardMarkup:
    """Клавиатура тонов"""
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="💼 Профессиональный",
                    callback_data="tone:professional"
                ),
                InlineKeyboardButton(
                    text="😊 Дружелюбный",
                    callback_data="tone:friendly"
                )
            ],
            [
                InlineKeyboardButton(
                    text="🎭 Креативный",
                    callback_data="tone:creative"
                ),
                InlineKeyboardButton(
                    text="🎯 Мотивирующий",
                    callback_data="tone:motivational"
                )
            ],
            [
                InlineKeyboardButton(
                    text="😄 Юмористический",
                    callback_data="tone:humorous"
                ),
                InlineKeyboardButton(
                    text="📊 Информативный",
                    callback_data="tone:informative"
                )
            ]
        ]
    )
    return keyboard


def get_platform_keyboard() -> InlineKeyboardMarkup:
    """Клавиатура платформ"""
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="📷 Instagram",
                    callback_data="platform:instagram"
                ),
                InlineKeyboardButton(
                    text="👥 VK",
                    callback_data="platform:vk"
                )
            ],
            [
                InlineKeyboardButton(
                    text="✈️ Telegram",
                    callback_data="platform:telegram"
                ),
                InlineKeyboardButton(
                    text="🐦 Twitter/X",
                    callback_data="platform:twitter"
                )
            ],
            [
                InlineKeyboardButton(
                    text="💼 LinkedIn",
                    callback_data="platform:linkedin"
                ),
                InlineKeyboardButton(
                    text="📺 YouTube",
                    callback_data="platform:youtube"
                )
            ]
        ]
    )
    return keyboard
