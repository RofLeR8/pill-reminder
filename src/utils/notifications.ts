import type { Medicine } from '../types';

// Запрос разрешения на уведомления
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log('Уведомления не поддерживаются браузером');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

// Показать уведомление
export const showNotification = async (
  title: string,
  options: NotificationOptions = {}
): Promise<void> => {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  // Если есть service worker, используем его
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    const registration = await navigator.serviceWorker.ready;
    await registration.showNotification(title, {
      badge: '/pwa-192x192.png',
      icon: '/pwa-192x192.png',
      ...options,
    });
  } else {
    // Иначе показываем обычное уведомление
    new Notification(title, {
      icon: '/pwa-192x192.png',
      ...options,
    });
  }
};

// Запланировать уведомление о приёме лекарства
export const scheduleMedicineNotification = async (
  medicine: Medicine,
  scheduledTime: Date
): Promise<void> => {
  const now = new Date();
  const timeUntilNotification = scheduledTime.getTime() - medicine.reminderBefore * 60 * 1000 - now.getTime();

  if (timeUntilNotification <= 0) {
    return; // Время уже прошло
  }

  // Планируем уведомление
  setTimeout(async () => {
    await showNotification(`Время принять ${medicine.name}`, {
      body: `${medicine.quantity} ${medicine.quantityUnit} ${medicine.dosage} ${medicine.dosageUnit}\n${medicine.instruction}`,
      tag: `medicine-${medicine.id}-${scheduledTime.getTime()}`,
      requireInteraction: true,
    });
  }, timeUntilNotification);
};

// Отменить все уведомления
export const cancelAllNotifications = async (): Promise<void> => {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    const registration = await navigator.serviceWorker.ready;
    const notifications = await registration.getNotifications();
    notifications.forEach(notification => notification.close());
  }
};

// Проверка поддержки уведомлений
export const isNotificationSupported = (): boolean => {
  return 'Notification' in window;
};

// Получить статус разрешения уведомлений
export const getNotificationPermission = (): NotificationPermission => {
  if (!isNotificationSupported()) {
    return 'denied';
  }
  return Notification.permission;
};
