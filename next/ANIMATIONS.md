# Анимации в Midas

## Установка Framer Motion

После создания всех файлов, установите framer-motion:

```bash
cd next
npm install framer-motion
```

## Что добавлено

### 1. Page Transitions (template.tsx)
Автоматические анимации при переходе между страницами:
- Fade in/out с движением вверх/вниз
- Плавность 0.3s с easing функцией

### 2. Sidebar Animations
- **Logo**: Hover эффект с масштабированием и поворотом
- **Navigation Items**: 
  - Staggered появление при загрузке
  - `layoutId="activeTab"` для плавного перехода активного состояния
  - Иконки с spring анимацией при hover
- **User Profile**: Hover эффект с масштабированием

### 3. Анимации элементов

#### Stat Cards
- Появление с задержкой (staggered)
- Иконки масштабируются при hover
- Цифры меняют цвет плавно

#### Campaign Cards
- Slide влево при hover
- Fade in с задержкой

#### Quick Actions
- Slide вверх при hover
- Иконки масштабируются

## Использование

### В компонентах

```tsx
import { motion } from 'framer-motion'

// Простая анимация
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>

// Hover анимация
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>

// Layout анимация (для плавного перехода)
<motion.div layoutId="uniqueId">
  Content
</motion.div>
```

### Staggered Children

```tsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

## Типы анимаций

### 1. Fade
- `opacity: 0 → 1`
- Используется для появления элементов

### 2. Slide
- `y: 20 → 0` (снизу вверх)
- `x: 20 → 0` (справа налево)
- Используется для page transitions

### 3. Scale
- `scale: 0.95 → 1`
- Используется для hover эффектов

### 4. Layout
- Автоматическая анимация изменения layout
- Используется для активного таба в sidebar

## Performance

Все анимации оптимизированы:
- Используют `transform` и `opacity` (GPU ускорение)
- Не вызывают reflow/repaint
- Плавные 60 FPS

## Настройка

Измените параметры в компонентах:

```tsx
// Быстрее
transition={{ duration: 0.2 }}

// Медленнее
transition={{ duration: 0.5 }}

// Spring эффект
transition={{ type: "spring", stiffness: 400, damping: 10 }}

// Easing
transition={{ ease: [0.4, 0, 0.2, 1] }}
```
