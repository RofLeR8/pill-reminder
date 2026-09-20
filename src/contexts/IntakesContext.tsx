import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { MedicineIntake } from '../types';
import { intakeAPI } from '../services/api';

interface IntakesContextType {
  intakes: MedicineIntake[];
  loading: boolean;
  error: string | null;
  getAllIntakes: () => Promise<void>;
  getIntakesByMedicine: (medicineId: string) => MedicineIntake[];
  getIntakesByDateRange: (startDate: Date, endDate: Date) => MedicineIntake[];
  createIntake: (data: Omit<MedicineIntake, 'id'>) => Promise<MedicineIntake>;
  markAsTaken: (id: string) => Promise<void>;
  markAsSkipped: (id: string) => Promise<void>;
  getStatistics: () => {
    total: number;
    taken: number;
    skipped: number;
    missed: number;
    percentage: number;
  };
}

const IntakesContext = createContext<IntakesContextType | undefined>(undefined);

export const IntakesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [intakes, setIntakes] = useState<MedicineIntake[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllIntakes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await intakeAPI.getAll();
      setIntakes(data);
    } catch (err) {
      setError('Ошибка загрузки истории приёмов');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getIntakesByMedicine = (medicineId: string) => {
    return intakes.filter(i => i.medicineId === medicineId);
  };

  const getIntakesByDateRange = (startDate: Date, endDate: Date) => {
    return intakes.filter(i => {
      const intakeDate = new Date(i.scheduledTime);
      return intakeDate >= startDate && intakeDate <= endDate;
    });
  };

  const createIntake = async (data: Omit<MedicineIntake, 'id'>) => {
    try {
      const newIntake = await intakeAPI.create(data);
      setIntakes(prev => [newIntake, ...prev]);
      return newIntake;
    } catch (err) {
      setError('Ошибка создания записи о приёме');
      throw err;
    }
  };

  const markAsTaken = async (id: string) => {
    try {
      await intakeAPI.markAsTaken(id);
      setIntakes(prev =>
        prev.map(i =>
          i.id === id
            ? { ...i, status: 'taken' as const, takenAt: new Date().toISOString() }
            : i
        )
      );
    } catch (err) {
      setError('Ошибка отметки приёма');
      throw err;
    }
  };

  const markAsSkipped = async (id: string) => {
    try {
      await intakeAPI.markAsSkipped(id);
      setIntakes(prev =>
        prev.map(i => (i.id === id ? { ...i, status: 'skipped' as const } : i))
      );
    } catch (err) {
      setError('Ошибка отметки пропуска');
      throw err;
    }
  };

  const getStatistics = () => {
    const total = intakes.length;
    const taken = intakes.filter(i => i.status === 'taken').length;
    const skipped = intakes.filter(i => i.status === 'skipped').length;
    const missed = intakes.filter(i => i.status === 'missed').length;
    const percentage = total > 0 ? Math.round((taken / total) * 100) : 0;

    return { total, taken, skipped, missed, percentage };
  };

  return (
    <IntakesContext.Provider
      value={{
        intakes,
        loading,
        error,
        getAllIntakes,
        getIntakesByMedicine,
        getIntakesByDateRange,
        createIntake,
        markAsTaken,
        markAsSkipped,
        getStatistics,
      }}
    >
      {children}
    </IntakesContext.Provider>
  );
};

export const useIntakes = () => {
  const context = useContext(IntakesContext);
  if (!context) {
    throw new Error('useIntakes must be used within IntakesProvider');
  }
  return context;
};
