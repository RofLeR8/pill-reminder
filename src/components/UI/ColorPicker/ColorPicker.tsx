import React from 'react';
import './ColorPicker.css';
import { Check } from 'lucide-react';

interface ColorPickerProps {
  label: string;
  colors: string[]; // массив hex цветов
  value: string;
  onChange: (color: string) => void;
  allowCustom?: boolean;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  colors,
  value,
  onChange,
  allowCustom = false,
}) => {
  const [showCustomInput, setShowCustomInput] = React.useState(false);
  const [customColor, setCustomColor] = React.useState(value);

  const handleCustomColorSubmit = () => {
    if (customColor && /^#[0-9A-F]{6}$/i.test(customColor)) {
      onChange(customColor);
      setShowCustomInput(false);
    }
  };

  return (
    <div className="color-picker">
      <label className="color-picker__label">{label}</label>
      <div className="color-picker__grid">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            className={`color-picker__item ${value === color ? 'color-picker__item--selected' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
            aria-label={`Выбрать цвет ${color}`}
          >
            {value === color && (
              <Check size={20} className="color-picker__check" />
            )}
          </button>
        ))}
        
        {allowCustom && (
          <button
            type="button"
            className="color-picker__item color-picker__item--custom"
            onClick={() => setShowCustomInput(!showCustomInput)}
            aria-label="Добавить свой цвет"
          >
            +
          </button>
        )}
      </div>
      
      {showCustomInput && (
        <div className="color-picker__custom">
          <input
            type="text"
            className="color-picker__custom-input"
            placeholder="#6A4BB5"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            maxLength={7}
          />
          <button
            type="button"
            className="color-picker__custom-btn"
            onClick={handleCustomColorSubmit}
          >
            Применить
          </button>
        </div>
      )}
    </div>
  );
};
