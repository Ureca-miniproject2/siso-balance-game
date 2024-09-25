import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import GlobalStyle from './styles/GlobalStyle.jsx';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme.js';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}
const queryClient = new QueryClient();

enableMocking().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>,
  );
});
