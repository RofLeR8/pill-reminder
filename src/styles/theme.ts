// Дизайн-система приложения на основе описания

export const colors = {
  // Основные цвета
  primary: '#6A4BB5',
  primaryLight: '#ECE6FA',
  
  // Фоны
  background: '#FAF9FC',
  surface: 'linear-gradient(135deg, #FFFFFF 0%, #F5F3F9 100%)',
  
  // Текст
  textPrimary: '#1A1A1A',
  textSecondary: '#6B7280',
  
  // Системные цвета
  destructive: '#EF4444',
  success: '#10B981',
  
  // Цвета для выбора лекарств
  medicineColors: {
    purple: '#6A4BB5',
    blue: '#3B82F6',
    green: '#10B981',
    orange: '#F59E0B',
    red: '#EF4444',
    gray: '#6B7280',
  },
  
  // Специальные
  shadow: 'rgba(106, 75, 181, 0.15)',
  overlay: 'rgba(0, 0, 0, 0.4)',
}

export const borderRadius = {
  sm: '10px',
  md: '14px',
  lg: '20px',
  xl: '28px',
  pill: '9999px',
}

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
}

export const typography = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "SF Pro Display", "Segoe UI", "Roboto", sans-serif',
  
  // Размеры шрифтов
  hero: {
    fontSize: '32px',
    fontWeight: 700,
    lineHeight: 1.2,
  },
  h1: {
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h2: {
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  body: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  bodyBold: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 1.5,
  },
  small: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  caption: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1.4,
  },
  time: {
    fontSize: '28px',
    fontWeight: 700,
    lineHeight: 1.2,
  },
}

export const shadows = {
  sm: `0 2px 8px ${colors.shadow}`,
  md: `0 4px 16px ${colors.shadow}`,
  lg: `0 8px 24px ${colors.shadow}`,
}

export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px',
}
