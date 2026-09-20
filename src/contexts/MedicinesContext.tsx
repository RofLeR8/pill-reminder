import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Medicine } from '../types';
import { medicineAPI } from '../services/api';

interface MedicinesContextType {
  medicines: Medicine[];
  loading: boolean;
  error: string | null;
  getAllMedicines: () => Promise<void>;
  getMedicineById: (id: string) => Medicine | undefined;
  createMedicine: (data: Omit<Medicine, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Medicine>;
  updateMedicine: (id: string, data: Partial<Medicine>) => Promise<Medicine | null>;
  deleteMedicine: (id: string) => Promise<void>;
  searchMedicines: (query: string) => Medicine[];
  filterMedicines: (filter: 'all' | 'active' | 'inactive') => Medicine[];
}

const MedicinesContext = createContext<MedicinesContextType | undefined>(undefined);

export const MedicinesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAllMedicines = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await medicineAPI.getAll();
      setMedicines(data);
    } catch (err) {
      setError('Ошибка загрузки лекарств');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getMedicineById = (id: string) => {
    return medicines.find(m => m.id === id);
  };

  const createMedicine = async (data: Omit<Medicine, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newMedicine = await medicineAPI.create(data);
      setMedicines(prev => [newMedicine, ...prev]);
      return newMedicine;
    } catch (err) {
      setError('Ошибка создания лекарства');
      throw err;
    }
  };

  const updateMedicine = async (id: string, data: Partial<Medicine>) => {
    try {
      const updated = await medicineAPI.update(id, data);
      if (updated) {
        setMedicines(prev => prev.map(m => m.id === id ? updated : m));
      }
      return updated;
    } catch (err) {
      setError('Ошибка обновления лекарства');
      throw err;
    }
  };

  const deleteMedicine = async (id: string) => {
    try {
      await medicineAPI.delete(id);
      setMedicines(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      setError('Ошибка удаления лекарства');
      throw err;
    }
  };

  const searchMedicines = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return medicines.filter(m =>
      m.name.toLowerCase().includes(lowerQuery) ||
      m.description.toLowerCase().includes(lowerQuery)
    );
  };

  const filterMedicines = (filter: 'all' | 'active' | 'inactive') => {
    if (filter === 'all') return medicines;
    if (filter === 'active') return medicines.filter(m => m.isActive);
    return medicines.filter(m => !m.isActive);
  };

  useEffect(() => {
    getAllMedicines();
  }, []);

  return (
    <MedicinesContext.Provider
      value={{
        medicines,
        loading,
        error,
        getAllMedicines,
        getMedicineById,
        createMedicine,
        updateMedicine,
        deleteMedicine,
        searchMedicines,
        filterMedicines,
      }}
    >
      {children}
    </MedicinesContext.Provider>
  );
};

export const useMedicines = () => {
  const context = useContext(MedicinesContext);
  if (!context) {
    throw new Error('useMedicines must be used within MedicinesProvider');
  }
  return context;
};
