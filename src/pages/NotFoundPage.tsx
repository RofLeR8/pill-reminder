import React from 'react';
import './NotFoundPage.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button/Button';
import { Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-page__content">
        <h1 className="not-found-page__title">404</h1>
        <p className="not-found-page__message">Страница не найдена</p>
        <p className="not-found-page__description">
          К сожалению, запрашиваемая страница не существует
        </p>
        <Button
          variant="primary"
          size="lg"
          icon={<Home size={20} />}
          onClick={() => navigate('/')}
        >
          На главную
        </Button>
      </div>
    </div>
  );
};
