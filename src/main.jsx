import ReactDOM from 'react-dom/client';
import { Suspense, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from '~/App';
import { CONFIG } from '~/configs/config-global';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <StrictMode>
        <HelmetProvider>
            <BrowserRouter
                basename={CONFIG.site.basePath}
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <Suspense>
                    <App />
                </Suspense>
            </BrowserRouter>
        </HelmetProvider>
    </StrictMode>,
);
