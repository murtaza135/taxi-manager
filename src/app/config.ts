export const config = {
  ...import.meta.env,
  APP_NAME: 'Taxi Manager',
  BREAKPOINTS: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;
