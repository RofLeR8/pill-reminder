export interface Medicine {
  // Основные поля
  id: string;
  name: string;
  description: string;
  dosage: number;
  dosageUnit: 'мг' | 'мл' | 'г' | 'мкг';
  quantity: number;
  quantityUnit: 'таблетка' | 'капсула' | 'мл' | 'доза' | 'шт';
  instruction: string;
  color: string;
  imageUrl?: string;
  times: string[]; // массив времён приёма в формате "HH:MM"
  frequency: 'Каждый день' | 'По определённым дням' | 'По необходимости';
  reminderBefore: number; // минут до приёма
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  
  // Дополнительная информация
  notes?: string; // Заметки/примечания к лекарству
  manufacturer?: string; // Производитель
  prescribedBy?: string; // Кем назначено (врач)
  
  // Управление запасами
  stockQuantity?: number; // Остаток в упаковке
  stockUnit?: string; // Единица измерения остатка
  expiryDate?: string; // Срок годности (ISO date)
  lowStockAlert?: boolean; // Уведомлять о низком остатке
  lowStockThreshold?: number; // Порог низкого остатка
  
  // Расписание (расширенное)
  specificDays?: number[]; // Дни недели [0-6] если frequency = 'По определённым дням'
  duration?: {
    startDate: string; // Дата начала приёма
    endDate?: string; // Дата окончания (опционально)
    totalDays?: number; // Длительность курса
  };
  
  // Дополнительные инструкции
  sideEffects?: string[]; // Возможные побочные эффекты
  contraindications?: string[]; // Противопоказания
  interactions?: string[]; // Взаимодействие с другими препаратами
  
  // Категоризация
  category?: 'antibiotics' | 'vitamins' | 'painkillers' | 'cardiac' | 'other';
  tags?: string[]; // Теги для фильтрации
  
  // Настройки уведомлений
  customReminderSound?: string;
  snoozeEnabled?: boolean;
  snoozeDuration?: number; // минуты
  
  // Метаданные
  refillReminderDays?: number; // За сколько дней напомнить о покупке
  barcode?: string; // Штрих-код для сканирования
  prescriptionNumber?: string; // Номер рецепта
}

export interface MedicineIntake {
  id: string;
  medicineId: string;
  scheduledTime: string; // ISO string
  takenAt?: string; // ISO string
  status: 'scheduled' | 'taken' | 'skipped' | 'missed';
  notes?: string;
}

export interface UserProfile {
  id: string;
  name?: string;
  avatar?: string;
  notificationsEnabled: boolean;
  createdAt: string;
}

export type MedicineColor = 'purple' | 'blue' | 'green' | 'orange' | 'red' | 'gray';

export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  language: 'ru' | 'en';
  timeFormat: '12h' | '24h';
  notifications: boolean;
  notificationSound: boolean;
  notificationVibrate: boolean;
  repeatReminder: boolean;
  repeatInterval: 5 | 10 | 15 | 30; // minutes
}
