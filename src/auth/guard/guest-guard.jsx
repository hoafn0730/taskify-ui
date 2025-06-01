import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useRouter, useSearchParams } from '~/routes/hooks';

import { CONFIG } from '~/configs/config-global';

import { SplashScreen } from '~/components/loading-screen';

// ----------------------------------------------------------------------

export function GuestGuard({ children }) {
    const router = useRouter();

    const searchParams = useSearchParams();

    const { status, isLoading, user } = useSelector((state) => state.user);

    const [isChecking, setIsChecking] = useState(true);

    const returnTo =
        searchParams.get('returnTo') || user.role === 'admin'
            ? CONFIG.auth.redirectPath[1]
            : CONFIG.auth.redirectPath[0];

    const checkPermissions = async () => {
        if (isLoading) {
            return;
        }

        if (status === 'authenticated') {
            router.replace(returnTo);
            return;
        }

        setIsChecking(false);
    };

    useEffect(() => {
        checkPermissions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, isLoading]);

    if (isChecking) {
        return <SplashScreen />;
    }

    return <>{children}</>;
}
