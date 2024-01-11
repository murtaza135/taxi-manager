import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/app/queryClient';
import { DarkModeProvider } from './features/darkmode/context/DarkModeProvider';
import { NavProvider } from './features/navigation/context/NavProvider';
import { App } from '@/app/App';
import '@/styles/main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <NavProvider>
          <App />
        </NavProvider>
      </DarkModeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
