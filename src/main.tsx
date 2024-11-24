// TODO remove fgcontext if no context needed
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <FGContextProvider> */}
      <App />
      {/* </FGContextProvider> */}
    </BrowserRouter>
  </React.StrictMode>,
);
