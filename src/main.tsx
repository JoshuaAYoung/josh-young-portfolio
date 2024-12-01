// TODO remove fgcontext if no context needed
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import { JYContextProvider } from './context/JYContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <JYContextProvider>
        <App />
      </JYContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
