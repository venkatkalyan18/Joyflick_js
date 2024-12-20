import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

// Wrap the StrictMode around the entire Router to ensure all features work correctly in development mode
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router> {/* This is where BrowserRouter should be used */}
      <App />
    </Router>
  </StrictMode>
);
