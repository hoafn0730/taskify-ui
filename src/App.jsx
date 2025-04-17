import { Provider } from 'react-redux';

import '~/global.css';

// ----------------------------------------------------------------------

import { Router } from '~/routes/sections';

import { useScrollToTop } from '~/hooks/use-scroll-to-top';

import { CONFIG } from '~/config-global';
import { LocalizationProvider } from '~/locales';
import { I18nProvider } from '~/locales/i18n-provider';
import { ThemeProvider } from '~/theme/theme-provider';

import { Snackbar } from '~/components/snackbar';
import { ProgressBar } from '~/components/progress-bar';
import { MotionLazy } from '~/components/animate/motion-lazy';
import { SettingsDrawer, defaultSettings, SettingsProvider } from '~/components/settings';

import { CheckoutProvider } from '~/sections/checkout/context';

import { AuthProvider as JwtAuthProvider } from '~/auth/context/auth';
import { store } from './store';

// ----------------------------------------------------------------------

const AuthProvider = JwtAuthProvider;

export default function App() {
    useScrollToTop();

    return (
        <Provider store={store}>
            <I18nProvider>
                <LocalizationProvider>
                    <AuthProvider>
                        <SettingsProvider settings={defaultSettings}>
                            <ThemeProvider>
                                <MotionLazy>
                                    <CheckoutProvider>
                                        <Snackbar />
                                        <ProgressBar />
                                        <SettingsDrawer />
                                        <Router />
                                    </CheckoutProvider>
                                </MotionLazy>
                            </ThemeProvider>
                        </SettingsProvider>
                    </AuthProvider>
                </LocalizationProvider>
            </I18nProvider>
        </Provider>
    );
}
