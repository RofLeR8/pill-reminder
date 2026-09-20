import type { Medicine, MedicineIntake, UserProfile } from '../types';

// Моковые данные для разработки
// В будущем эти функции будут заменены на реальные API-вызовы

const mockMedicines: Medicine[] = [
  {
    id: '1',
    name: 'Парацетамол',
    description: 'Обезболивающее и жаропонижающее',
    dosage: 250,
    dosageUnit: 'мг',
    quantity: 1,
    quantityUnit: 'таблетка',
    instruction: 'После еды',
    color: '#6A4BB5',
    times: ['22:00'],
    frequency: 'Каждый день',
    reminderBefore: 15,
    isActive: true,
    createdAt: '2026-09-15T10:00:00.000Z',
    updatedAt: '2026-09-15T10:00:00.000Z',
  },
  {
    id: '2',
    name: 'Витамин D3',
    description: 'Витаминная добавка',
    dosage: 1000,
    dosageUnit: 'мг',
    quantity: 1,
    quantityUnit: 'капсула',
    instruction: 'Утром во время еды',
    color: '#F59E0B',
    times: ['09:00'],
    frequency: 'Каждый день',
    reminderBefore: 15,
    isActive: true,
    createdAt: '2026-09-16T10:00:00.000Z',
    updatedAt: '2026-09-16T10:00:00.000Z',
  },
  {
    id: '3',
    name: 'Омепразол',
    description: 'Для лечения язвы желудка',
    dosage: 20,
    dosageUnit: 'мг',
    quantity: 1,
    quantityUnit: 'таблетка',
    instruction: 'За 30 минут до еды',
    color: '#3B82F6',
    times: ['08:00', '20:00'],
    frequency: 'Каждый день',
    reminderBefore: 15,
    isActive: true,
    createdAt: '2026-09-17T10:00:00.000Z',
    updatedAt: '2026-09-17T10:00:00.000Z',
  },
];

// API для работы с лекарствами
export const medicineAPI = {
  async getAll(): Promise<Medicine[]> {
    // TODO: Заменить на fetch('/api/medicines')
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockMedicines]), 300);
    });
  },

  async getById(id: string): Promise<Medicine | null> {
    // TODO: Заменить на fetch(`/api/medicines/${id}`)
    return new Promise((resolve) => {
      setTimeout(() => {
        const medicine = mockMedicines.find(m => m.id === id);
        resolve(medicine || null);
      }, 200);
    });
  },

  async create(medicine: Omit<Medicine, 'id' | 'createdAt' | 'updatedAt'>): Promise<Medicine> {
    // TODO: Заменить на fetch('/api/medicines', { method: 'POST', body: JSON.stringify(medicine) })
    return new Promise((resolve) => {
      setTimeout(() => {
        const newMedicine: Medicine = {
          ...medicine,
          id: `${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        mockMedicines.push(newMedicine);
        resolve(newMedicine);
      }, 300);
    });
  },

  async update(id: string, updates: Partial<Medicine>): Promise<Medicine | null> {
    // TODO: Заменить на fetch(`/api/medicines/${id}`, { method: 'PUT', body: JSON.stringify(updates) })
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockMedicines.findIndex(m => m.id === id);
        if (index === -1) {
          resolve(null);
          return;
        }
        mockMedicines[index] = {
          ...mockMedicines[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        resolve(mockMedicines[index]);
      }, 300);
    });
  },

  async delete(id: string): Promise<void> {
    // TODO: Заменить на fetch(`/api/medicines/${id}`, { method: 'DELETE' })
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockMedicines.findIndex(m => m.id === id);
        if (index !== -1) {
          mockMedicines.splice(index, 1);
        }
        resolve();
      }, 300);
    });
  },
};

// API для работы с приёмами лекарств
export const intakeAPI = {
  async getAll(): Promise<MedicineIntake[]> {
    // TODO: Заменить на fetch('/api/intakes')
    return new Promise((resolve) => {
      setTimeout(() => resolve([]), 300);
    });
  },

  async create(intake: Omit<MedicineIntake, 'id'>): Promise<MedicineIntake> {
    // TODO: Заменить на fetch('/api/intakes', { method: 'POST', body: JSON.stringify(intake) })
    return new Promise((resolve) => {
      setTimeout(() => {
        const newIntake: MedicineIntake = {
          ...intake,
          id: `${Date.now()}`,
        };
        resolve(newIntake);
      }, 300);
    });
  },

  async markAsTaken(_id: string): Promise<MedicineIntake | null> {
    // TODO: Заменить на fetch(`/api/intakes/${id}/taken`, { method: 'POST' })
    return new Promise((resolve) => {
      setTimeout(() => resolve(null), 300);
    });
  },

  async markAsSkipped(_id: string): Promise<MedicineIntake | null> {
    // TODO: Заменить на fetch(`/api/intakes/${id}/skip`, { method: 'POST' })
    return new Promise((resolve) => {
      setTimeout(() => resolve(null), 300);
    });
  },
};

// API для работы с профилем
export const profileAPI = {
  async get(): Promise<UserProfile | null> {
    // TODO: Заменить на fetch('/api/profile')
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: '1',
          notificationsEnabled: true,
          createdAt: new Date().toISOString(),
        });
      }, 300);
    });
  },

  async update(_updates: Partial<UserProfile>): Promise<UserProfile | null> {
    // TODO: Заменить на fetch('/api/profile', { method: 'PUT', body: JSON.stringify(updates) })
    return new Promise((resolve) => {
      setTimeout(() => resolve(null), 300);
    });
  },
};
