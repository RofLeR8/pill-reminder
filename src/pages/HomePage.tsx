import React from 'react';
import { MedicineCarousel } from '../components/MedicineCarousel/MedicineCarousel';
import { ActionPanel } from '../components/ActionPanel/ActionPanel';
import { useMedicines } from '../contexts/MedicinesContext';
import { useToast } from '../contexts/ToastContext';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const { medicines, loading } = useMedicines();
  const { showToast } = useToast();

  const handleTaken = async (medicineId: string) => {
    console.log('Лекарство принято:', medicineId);
    showToast('Отметка о приёме сохранена', 'success');
    // TODO: Реализовать запись о приёме через IntakesContext
  };

  const handleDetails = (medicineId: string) => {
    console.log('Открыть детали:', medicineId);
    // TODO: Открыть модальное окно с деталями или переход на страницу
  };

  const handleSecondaryAction = (action: 'skip' | 'postpone') => {
    if (action === 'skip') {
      showToast('Приём пропущен', 'info');
    } else {
      showToast('Напоминание отложено на 15 минут', 'info');
    }
    // TODO: Реализовать через IntakesContext
  };

  if (loading) {
    return (
      <div className="home-page home-page--loading">
        <div className="home-page__loader">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <main className="home-page__content">
        <MedicineCarousel
          medicines={medicines}
          onTaken={handleTaken}
          onDetails={handleDetails}
        />
      </main>

      <ActionPanel
        onTaken={() => {
          if (medicines.length > 0) {
            handleTaken(medicines[0].id);
          }
        }}
        onSecondaryAction={handleSecondaryAction}
      />
    </div>
  );
};
