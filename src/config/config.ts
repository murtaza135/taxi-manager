export const config = {
  ...import.meta.env,
  APP_NAME: 'Taxi Manager',
  BREAKPOINTS: {
    xs: '425px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;
