import React from 'react';
import './TimePicker.css';

interface TimePickerProps {
  label: string;
  value: string; // "HH:MM"
  onChange: (time: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  label,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="time-picker">
      <label className="time-picker__label">
        {label}
        {required && <span className="time-picker__required">*</span>}
      </label>
      <input
        type="time"
        className={`time-picker__input ${error ? 'time-picker__input--error' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? 'error-message' : undefined}
      />
      {error && (
        <span className="time-picker__error" id="error-message">
          {error}
        </span>
      )}
    </div>
  );
};
