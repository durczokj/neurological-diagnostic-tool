import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import App from '@/App/App.jsx';
import '@/i18n/config.js';
import browserHistory from './browserHistory';

// Create a theme instance with your specified primary and secondary colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#880015', // Your specified color for primary
    },
    secondary: {
      main: '#0E2E75', // Your specified color for secondary
    },
    // ...other options
  },
});

// Render your app component, wrapped with ThemeProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <Router history={browserHistory}>
      <App />
    </Router>
  </ThemeProvider>
);
