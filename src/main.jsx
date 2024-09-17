import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';

import App from '~/App';
import theme from '~/theme';
import { store } from '~/store';
import { I18nextProvider } from 'react-i18next';
import i18n from '~/utils/i18n';

createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <App />
            </I18nextProvider>
        </Provider>
    </ThemeProvider>,
);
