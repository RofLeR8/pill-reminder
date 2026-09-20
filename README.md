# Pill Reminder PWA

Приложение для напоминания о приёме лекарств, реализованное как Progressive Web App (PWA).

## Возможности

- 📱 **PWA** - устанавливается на любое устройство (iOS, Android, Desktop)
- 💊 **Карусель лекарств** - свайп между карточками лекарств
- ⏰ **Напоминания** - система уведомлений о времени приёма
- 🎨 **Современный дизайн** - на основе детального UI/UX дизайна
- 📱 **Адаптивность** - работает на мобильных и десктопах
- 🌐 **Офлайн режим** - работает без интернета

## Технологический стек

- **React 18** + **TypeScript**
- **Vite** - быстрая сборка
- **PWA** - vite-plugin-pwa + Workbox
- **Lucide React** - современные иконки
- **LocalForage** - хранение данных (готово для замены на API)

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для production
npm run build

# Preview production сборки
npm run preview
```

## Структура проекта

```
src/
├── components/         # React компоненты
│   ├── Button/
│   ├── Header/
│   ├── Drawer/
│   ├── ProfilePopover/
│   ├── MedicineCard/
│   ├── MedicineCarousel/
│   └── ActionPanel/
├── pages/             # Страницы приложения
│   ├── HomePage.tsx
│   ├── MedicinesPage.tsx
│   ├── MedicineFormPage.tsx
│   ├── InsightsPages.tsx
│   ├── SettingsPages.tsx
│   └── AuthPage.tsx
├── services/          # API и сервисы
│   └── api.ts         # Mock API (готов к замене на реальный backend)
├── styles/            # Глобальные стили и дизайн-система
│   ├── global.css
│   └── theme.ts
├── types/             # TypeScript типы
│   └── index.ts
└── utils/             # Утилиты
    └── notifications.ts
```

## Дизайн-система

### Цвета
- Основной: `#6A4BB5` (фиолетовый)
- Светлый акцент: `#ECE6FA` (лавандовый)
- Фон: `#FAF9FC`
- Деструктивный: `#EF4444` (красный)

### Скругления
- Small: `10px`
- Medium: `14px`
- Large: `20px`
- XLarge: `28px`
- Pill: `9999px`

## API интеграция

Приложение использует mock API в `src/services/api.ts`. Для интеграции с реальным backend:

1. Замените функции в `medicineAPI`, `intakeAPI`, `profileAPI`
2. Добавьте fetch запросы к вашему API
3. Все TODO комментарии указывают места для замены

Пример:
```typescript
async getAll(): Promise<Medicine[]> {
  const response = await fetch('/api/medicines');
  return response.json();
}
```

## PWA настройки

PWA конфигурация находится в `vite.config.ts`:
- Название: "Напоминание о лекарствах"
- Короткое название: "Таблетница"
- Тема: `#6A4BB5`
- Режим: standalone

## Особенности реализации

- **Карусель** - поддержка свайпов на мобильных устройствах
- **3D капсула** - CSS градиенты и тени для объёмного эффекта
- **Анимации** - плавные переходы и transform эффекты
- **Accessibility** - поддержка клавиатуры, aria-labels, фокус

## Статус разработки

- [x] Экран создания и редактирования лекарства
- [x] Маршрутизация и страницы расписания, истории, статистики, настроек и помощи
- [x] Демо-регистрация и вход без backend
- [ ] Реальные PWA-иконки 192×192 и 512×512
- [ ] Интеграция с реальным backend API

## Лицензия

MIT
