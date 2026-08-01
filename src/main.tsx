import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

registerSW({ immediate: true });

// Cegah double-tap zoom (terutama iOS Safari yang mengabaikan user-scalable=no)
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) e.preventDefault();
  lastTouchEnd = now;
}, { passive: false });

// Cegah pinch-zoom gesture (Safari)
document.addEventListener('gesturestart', (e) => e.preventDefault());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AdminAuthProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </AdminAuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
