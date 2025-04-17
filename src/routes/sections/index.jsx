import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import { MainLayout } from '~/layouts/main';

import { SplashScreen } from '~/components/loading-screen';

import { authRoutes } from './auth';
import { mainRoutes } from './main';
import { authDemoRoutes } from './auth-demo';
import { dashboardRoutes } from './dashboard';
import { componentsRoutes } from './components';
import { CONFIG } from '~/config-global';

// ----------------------------------------------------------------------

const HomePage = lazy(() => import('~/pages/home'));

export function Router() {
    return useRoutes([
        {
            path: '/',
            /**
             * Skip home page
             * element: <Navigate to={CONFIG.auth.redirectPath} replace />,
             */
            element: <Navigate to={CONFIG.auth.redirectPath} replace />,

            // element: (
            //     <Suspense fallback={<SplashScreen />}>
            //         <MainLayout>
            //             <HomePage />
            //         </MainLayout>
            //     </Suspense>
            // ),
        },

        // Auth
        ...authRoutes,
        ...authDemoRoutes,

        // Dashboard
        ...dashboardRoutes,

        // Main
        ...mainRoutes,

        // Components
        ...componentsRoutes,

        // No match
        { path: '*', element: <Navigate to="/404" replace /> },
    ]);
}
