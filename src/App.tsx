import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { ToastContainer } from './components/Toast/ToastContainer';
import { IntakesProvider } from './contexts/IntakesContext';
import { MedicinesProvider } from './contexts/MedicinesContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { ToastProvider } from './contexts/ToastContext';
import { AuthPage } from './pages/AuthPage';
import { HistoryPage, SchedulePage, StatisticsPage } from './pages/InsightsPages';
import { HomePage } from './pages/HomePage';
import { MedicineFormPage } from './pages/MedicineFormPage';
import { MedicinesPage } from './pages/MedicinesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ExportPage, HelpPage, ProfilePage, RemindersPage, SettingsPage } from './pages/SettingsPages';
import './styles/global.css';
function App() { return <BrowserRouter><ToastProvider><SettingsProvider><MedicinesProvider><IntakesProvider><Routes><Route path="/login" element={<AuthPage mode="login"/>}/><Route path="/register" element={<AuthPage mode="register"/>}/><Route path="/" element={<Layout/>}><Route index element={<HomePage/>}/><Route path="medicines" element={<MedicinesPage/>}/><Route path="medicines/new" element={<MedicineFormPage/>}/><Route path="medicines/:id/edit" element={<MedicineFormPage/>}/><Route path="schedule" element={<SchedulePage/>}/><Route path="history" element={<HistoryPage/>}/><Route path="reminders" element={<RemindersPage/>}/><Route path="statistics" element={<StatisticsPage/>}/><Route path="export" element={<ExportPage/>}/><Route path="settings" element={<SettingsPage/>}/><Route path="profile" element={<ProfilePage/>}/><Route path="help" element={<HelpPage/>}/><Route path="*" element={<NotFoundPage/>}/></Route></Routes><ToastContainer/></IntakesProvider></MedicinesProvider></SettingsProvider></ToastProvider></BrowserRouter>; }
export default App;
