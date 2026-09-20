import React from 'react';
import './Input.css';

interface InputProps {
  label: string;
  type?: 'text' | 'number' | 'email' | 'password' | 'tel';
  placeholder?: string;
  value: string | number;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  min?: number;
  max?: number;
  step?: number;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  maxLength,
  min,
  max,
  step,
}) => {
  return (
    <div className="input-field">
      <label className="input-field__label">
        {label}
        {required && <span className="input-field__required">*</span>}
      </label>
      <input
        type={type}
        className={`input-field__input ${error ? 'input-field__input--error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        maxLength={maxLength}
        min={min}
        max={max}
        step={step}
        aria-invalid={!!error}
        aria-describedby={error ? 'error-message' : undefined}
      />
      {error && (
        <span className="input-field__error" id="error-message">
          {error}
        </span>
      )}
    </div>
  );
};
