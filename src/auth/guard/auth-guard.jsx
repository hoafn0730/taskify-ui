import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { paths } from '~/configs/paths';
import { useRouter, usePathname, useSearchParams } from '~/routes/hooks';

import { CONFIG } from '~/configs/config-global';

import { SplashScreen } from '~/components/loading-screen';
import { getCurrentUser } from '~/store/actions/userAction';

export function AuthGuard({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();

    const { status, isLoading } = useSelector((state) => state.user);
    const [isChecking, setIsChecking] = useState(true);

    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams],
    );

    const checkPermissions = async () => {
        if (isLoading) {
            return;
        }

        if (status !== 'authenticated') {
            const { method } = CONFIG.auth;

            const signInPath = {
                auth: paths.auth.signIn,
            }[method];

            const href = `${signInPath}?${createQueryString('returnTo', pathname)}`;

            router.replace(href);
            return;
        }

        setIsChecking(false);
    };

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);

    useEffect(() => {
        checkPermissions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, isLoading]);

    if (isChecking) {
        return <SplashScreen />;
    }

    return <>{children}</>;
}
