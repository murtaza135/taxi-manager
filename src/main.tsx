import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/app/queryClient';
import { NavProvider } from './features/navigation/context/NavProvider';
import { NavTitleProvider } from './features/navigation/context/NavTitleProvider';
import { App } from '@/app/App';
import '@/styles/main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NavProvider>
        <NavTitleProvider>
          <App />
        </NavTitleProvider>
      </NavProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
