import React from 'react';
import type { Medicine } from '../../types';
import './MedicineCard.css';

interface MedicineCardProps {
  medicine: Medicine;
  onTaken: () => void;
  onDetails: () => void;
}

export const MedicineCard: React.FC<MedicineCardProps> = ({
  medicine,
  onDetails,
}) => {
  const getNextTime = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const nextTime = medicine.times
      .map(time => {
        const [hours, minutes] = time.split(':').map(Number);
        return { time, minutes: hours * 60 + minutes };
      })
      .filter(t => t.minutes > currentTime)
      .sort((a, b) => a.minutes - b.minutes)[0];
    
    return nextTime?.time || medicine.times[0];
  };

  return (
    <div className="medicine-card" style={{ '--medicine-color': medicine.color } as React.CSSProperties}>
      <div className="medicine-card__header">
        <div className="medicine-card__next-time">
          <span className="medicine-card__next-label">Следующий прием</span>
          <div className="medicine-card__time">{getNextTime()}</div>
        </div>
        <div className="medicine-card__dosage">
          {medicine.dosage} {medicine.dosageUnit}
        </div>
      </div>

      <div className="medicine-card__body">
        <div className="medicine-card__pill">
          <div className="pill-3d" style={{ backgroundColor: medicine.color }}>
            <div className="pill-3d__top"></div>
            <div className="pill-3d__bottom"></div>
          </div>
        </div>
        
        <h2 className="medicine-card__name">{medicine.name}</h2>
        <p className="medicine-card__description">{medicine.description}</p>
      </div>

      <div className="medicine-card__footer">
        <div className="medicine-card__info">
          <div className="medicine-card__quantity">
            {medicine.quantity} {medicine.quantityUnit}
          </div>
          <div className="medicine-card__instruction">{medicine.instruction}</div>
        </div>
        <button className="medicine-card__details" onClick={onDetails}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          Подробнее
        </button>
      </div>
    </div>
  );
};
