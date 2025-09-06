import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import store from './store';
import Layouts from './layouts';
import Routes from './routes';
import { THEME_CONFIG } from './configs/AppConfig';
import './lang';

const themes = {
  dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/css/light-theme.css`,
};

const AppContent = () => {
  const location = useLocation();
    localStorage.setItem(
        'token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OTllYjZlZWJkZDdlOWNjNDIzODRkYSIsInJvbGUiOnsiX2lkIjoiNjg3MDY0M2Q2M2EzMzRhNzUwMjViODEzIiwibmFtZSI6InVzZXIiLCJwZXJtaXNzaW9ucyI6W119LCJzZXNzaW9uSWQiOiI2ODlmM2Q0N2ViZGQ3ZTljYzQxNGU3ZDAiLCJpYXQiOjE3NTUyNjYzNzUsImV4cCI6MTc2MzgxOTk3NX0._B1NeclqubaWdBgFSWCytsaPsn7qgkkmi00i6nolRhQ'
    );

  // Hide main layout for preview routes
  const isPreview = location.pathname.startsWith('/preview/flow');

  return isPreview ? (
      <Routes /> // render routes directly (standalone)
  ) : (
      <Layouts>
        <Routes /> // render routes with full layout
      </Layouts>
  );
};

function App() {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <ThemeSwitcherProvider
              themeMap={themes}
              defaultTheme={THEME_CONFIG.currentTheme}
              insertionPoint="styles-insertion-point"
          >
            <AppContent />
          </ThemeSwitcherProvider>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
