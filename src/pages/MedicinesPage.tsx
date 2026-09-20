import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Edit3, Pill, Plus, Search, Trash2 } from 'lucide-react';
import { useMedicines } from '../contexts/MedicinesContext';
import { useToast } from '../contexts/ToastContext';
import { EmptyState } from '../components/UI/EmptyState/EmptyState';
import { ConfirmDialog } from '../components/UI/ConfirmDialog/ConfirmDialog';
import { Button } from '../components/Button/Button';
import './Pages.css';

export const MedicinesPage = () => {
  const { medicines, loading, deleteMedicine } = useMedicines();
  const { showToast } = useToast();
  const [query, setQuery] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();
  const visible = medicines.filter((medicine) => medicine.name.toLowerCase().includes(query.toLowerCase()));
  const deleting = medicines.find((medicine) => medicine.id === deletingId);

  const remove = async () => {
    if (!deletingId) return;
    await deleteMedicine(deletingId);
    showToast('Лекарство удалено', 'success');
  };

  return <section className="page"><div className="page__heading"><div><p className="page__eyebrow">Моя аптечка</p><h1>Лекарства</h1><p>Управляйте препаратами и их расписанием.</p></div><Button icon={<Plus size={19}/>} onClick={() => navigate('/medicines/new')}>Добавить</Button></div>
    <label className="search"><Search size={19}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти лекарство" aria-label="Найти лекарство"/></label>
    {loading ? <div className="page__loading">Загружаем лекарства…</div> : visible.length ? <div className="medicine-list">{visible.map((medicine) => <article className="medicine-list__item" key={medicine.id}><span className="medicine-list__pill" style={{background: medicine.color}}><Pill size={20}/></span><div className="medicine-list__content"><h2>{medicine.name}</h2><p>{medicine.dosage} {medicine.dosageUnit} · {medicine.times.join(', ')} · {medicine.frequency}</p><small>{medicine.instruction}</small></div><div className="medicine-list__actions"><Link to={`/medicines/${medicine.id}/edit`} aria-label={`Редактировать ${medicine.name}`}><Edit3 size={19}/></Link><button onClick={() => setDeletingId(medicine.id)} aria-label={`Удалить ${medicine.name}`}><Trash2 size={19}/></button></div></article>)}</div> : <EmptyState icon={<Pill size={42}/>} title="Лекарств пока нет" description="Добавьте препарат, чтобы составить расписание." action={{label: 'Добавить лекарство', onClick: () => navigate('/medicines/new')}}/>}
    <ConfirmDialog isOpen={Boolean(deleting)} onClose={() => setDeletingId(null)} onConfirm={remove} title="Удалить лекарство?" message={`«${deleting?.name ?? ''}» будет удалено из расписания и истории.`} confirmText="Удалить" variant="danger"/>
  </section>;
};
