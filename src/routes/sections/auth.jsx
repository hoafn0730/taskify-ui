import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthSplitLayout } from '~/layouts/auth-split';

import { SplashScreen } from '~/components/loading-screen';

import { GuestGuard } from '~/auth/guard';

// ----------------------------------------------------------------------

const Auth = {
    SignInPage: lazy(() => import('~/pages/auth/sign-in')),
    SignUpPage: lazy(() => import('~/pages/auth/sign-up')),
};

// ----------------------------------------------------------------------

export const authRoutes = [
    {
        path: 'auth',
        element: (
            <Suspense fallback={<SplashScreen />}>
                <Outlet />
            </Suspense>
        ),
        children: [
            {
                path: 'sign-in',
                element: (
                    <GuestGuard>
                        <AuthSplitLayout section={{ title: 'Hi, Welcome back' }}>
                            <Auth.SignInPage />
                        </AuthSplitLayout>
                    </GuestGuard>
                ),
            },
            {
                path: 'sign-up',
                element: (
                    <GuestGuard>
                        <AuthSplitLayout>
                            <Auth.SignUpPage />
                        </AuthSplitLayout>
                    </GuestGuard>
                ),
            },
        ],
    },
];
