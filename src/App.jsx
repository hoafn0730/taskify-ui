import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import '~/global.css';

import { Router } from '~/routes/sections';

import { useScrollToTop } from '~/hooks/use-scroll-to-top';

import { CONFIG } from '~/configs/config-global';
import { LocalizationProvider } from '~/locales';
import { I18nProvider } from '~/locales/i18n-provider';
import { ThemeProvider } from '~/theme/theme-provider';

import { Snackbar } from '~/components/snackbar';
import { ProgressBar } from '~/components/progress-bar';
import { MotionLazy } from '~/components/animate/motion-lazy';
import { SettingsDrawer, defaultSettings, SettingsProvider } from '~/components/settings';

import { CheckoutProvider } from '~/sections/checkout/context';

import { persistor, store } from './store';
import ModernChatbot from './components/chatbot';

export default function App() {
    useScrollToTop();

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <I18nProvider>
                    <LocalizationProvider>
                        <SettingsProvider settings={defaultSettings}>
                            <ThemeProvider>
                                <MotionLazy>
                                    <CheckoutProvider>
                                        <Snackbar />
                                        <ProgressBar />
                                        <SettingsDrawer />
                                        <Router />
                                        <ModernChatbot />
                                    </CheckoutProvider>
                                </MotionLazy>
                            </ThemeProvider>
                        </SettingsProvider>
                    </LocalizationProvider>
                </I18nProvider>
            </PersistGate>
        </Provider>
    );
}
