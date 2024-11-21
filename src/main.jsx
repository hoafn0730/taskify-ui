import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { ConfirmProvider } from 'material-ui-confirm';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';

import App from '~/App';
import theme from '~/theme';
import { store } from '~/store';
import i18n from '~/utils/i18n';

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <ConfirmProvider
                defaultOptions={{
                    allowClose: false,
                    dialogProps: {
                        maxWidth: 'xs',
                    },
                    confirmationButtonProps: {
                        color: 'primary',
                        variant: 'outlined',
                    },
                }}
            >
                <I18nextProvider i18n={i18n}>
                    <BrowserRouter
                        future={{
                            v7_startTransition: true,
                            v7_relativeSplatPath: true,
                        }}
                    >
                        <CssBaseline />
                        <App />
                        <ToastContainer closeOnClick />
                    </BrowserRouter>
                </I18nextProvider>
            </ConfirmProvider>
        </ThemeProvider>
    </Provider>,
    // </StrictMode>,
);
