export const config = {
  env: import.meta.env,
  appName: 'Taxi Manager',
  breakpoints: {
    xs: '425px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  colors: {
    primary: {
      light: '#7dd3fc',
      dark: '#0284c7',
    },
    achromatic: {
      light: '#fff',
      dark: '#27272a',
    },
    scene: {
      light: '#e0f2fe',
      dark: '#121212',
    },
  },
  supabase: {
    authKey: 'sb-127-auth-token',
  },
} as const;
