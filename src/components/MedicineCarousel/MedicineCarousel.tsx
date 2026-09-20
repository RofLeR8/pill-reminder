import React, { useState } from 'react';
import type { Medicine } from '../../types';
import { MedicineCard } from '../MedicineCard/MedicineCard';
import './MedicineCarousel.css';

interface MedicineCarouselProps {
  medicines: Medicine[];
  onTaken: (medicineId: string) => void;
  onDetails: (medicineId: string) => void;
}

export const MedicineCarousel: React.FC<MedicineCarouselProps> = ({
  medicines,
  onTaken,
  onDetails,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    const threshold = 50;

    if (Math.abs(distance) > threshold) {
      if (distance > 0) {
        // Swipe left - next
        setCurrentIndex((prev) => (prev + 1) % medicines.length);
      } else {
        // Swipe right - previous
        setCurrentIndex((prev) => (prev - 1 + medicines.length) % medicines.length);
      }
    }

    setIsDragging(false);
    setTouchStart(0);
  };

  // Вычисляем позицию и стиль для каждой карточки
  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    const totalCards = medicines.length;
    
    // Нормализуем разницу для кольцевого эффекта
    let normalizedDiff = diff;
    if (Math.abs(diff) > totalCards / 2) {
      normalizedDiff = diff > 0 ? diff - totalCards : diff + totalCards;
    }

    const angle = normalizedDiff * 15; // угол поворота для каждой карточки
    const translateZ = Math.abs(normalizedDiff) * -150; // глубина
    const translateX = normalizedDiff * 320; // горизонтальное смещение
    const opacity = normalizedDiff === 0 ? 1 : 0.3 + (1 - Math.min(Math.abs(normalizedDiff), 2) / 2) * 0.7;
    const scale = normalizedDiff === 0 ? 1 : 0.85 - Math.min(Math.abs(normalizedDiff), 2) * 0.1;

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${angle}deg) scale(${scale})`,
      opacity,
      zIndex: 100 - Math.abs(normalizedDiff),
      pointerEvents: normalizedDiff === 0 ? 'auto' : 'none',
    } as React.CSSProperties;
  };

  if (medicines.length === 0) {
    return (
      <div className="medicine-carousel medicine-carousel--empty">
        <p>Нет добавленных лекарств</p>
      </div>
    );
  }

  return (
    <div className="medicine-carousel">
      <div 
        className="medicine-carousel__container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="medicine-carousel__track-3d">
          {medicines.map((medicine, index) => (
            <div 
              key={medicine.id} 
              className="medicine-carousel__item-3d"
              style={getCardStyle(index)}
            >
              <MedicineCard
                medicine={medicine}
                onTaken={() => onTaken(medicine.id)}
                onDetails={() => onDetails(medicine.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Индикатор позиции */}
      <div className="medicine-carousel__indicator">
        {medicines.map((_, index) => (
          <button
            key={index}
            className={`medicine-carousel__dot ${
              index === currentIndex ? 'medicine-carousel__dot--active' : ''
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Перейти к лекарству ${index + 1}`}
          />
        ))}
      </div>

      {/* Подсказка о свайпе */}
      {medicines.length > 1 && (
        <div className="medicine-carousel__hint">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
          <span>Свайпайте влево или вправо</span>
        </div>
      )}
    </div>
  );
};
