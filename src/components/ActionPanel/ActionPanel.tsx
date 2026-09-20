import React, { useState, useRef } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '../Button/Button';
import './ActionPanel.css';

interface ActionPanelProps {
  onTaken: () => void;
  onSecondaryAction: (action: 'skip' | 'postpone') => void;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({
  onTaken,
  onSecondaryAction,
}) => {
  const [showActions, setShowActions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <div className="action-panel">
      <Button
        variant="primary"
        size="lg"
        icon={<Check size={24} />}
        onClick={onTaken}
        className="action-panel__primary"
      >
        Принял(а)
      </Button>

      <div className="action-panel__secondary">
        <button
          className="action-panel__dropdown-btn"
          onClick={() => setShowActions(!showActions)}
          aria-label="Дополнительные действия"
        >
          <ChevronDown size={24} />
        </button>

        {showActions && (
          <div ref={dropdownRef} className="action-panel__dropdown">
            <button
              className="action-panel__dropdown-item"
              onClick={() => {
                onSecondaryAction('skip');
                setShowActions(false);
              }}
            >
              Пропустить
            </button>
            <button
              className="action-panel__dropdown-item"
              onClick={() => {
                onSecondaryAction('postpone');
                setShowActions(false);
              }}
            >
              Отложить
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
