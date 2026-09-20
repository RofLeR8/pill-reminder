import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MedicineCarousel } from '../components/MedicineCarousel/MedicineCarousel';
import { ActionPanel } from '../components/ActionPanel/ActionPanel';
import { useMedicines } from '../contexts/MedicinesContext';
import { useIntakes } from '../contexts/IntakesContext';
import { useToast } from '../contexts/ToastContext';
import './HomePage.css';
export const HomePage: React.FC = () => { const { medicines, loading }=useMedicines(); const {createIntake}=useIntakes(); const {showToast}=useToast(); const navigate=useNavigate(); const handleTaken=async(medicineId:string)=>{await createIntake({medicineId,scheduledTime:new Date().toISOString(),takenAt:new Date().toISOString(),status:'taken'});showToast('Отметка о приёме сохранена','success')}; const handleSecondaryAction=async(action:'skip'|'postpone')=>{if(!medicines[0])return;if(action==='skip'){await createIntake({medicineId:medicines[0].id,scheduledTime:new Date().toISOString(),status:'skipped'});showToast('Приём пропущен','info')}else showToast('Напоминание отложено на 15 минут','info')}; if(loading)return <div className="home-page home-page--loading"><div className="home-page__loader">Загрузка...</div></div>;return <div className="home-page"><main className="home-page__content"><MedicineCarousel medicines={medicines} onTaken={handleTaken} onDetails={(id)=>navigate(`/medicines/${id}/edit`)}/></main><ActionPanel onTaken={()=>medicines[0]&&handleTaken(medicines[0].id)} onSecondaryAction={handleSecondaryAction}/></div> };
