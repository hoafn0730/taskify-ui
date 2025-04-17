/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import Button from '@mui/material/Button';

import { useRouter } from '~/routes/hooks';

import { CONFIG } from '~/config-global';

import { toast } from '~/components/snackbar';

import { useAuthContext } from '~/auth/hooks';
import { signOut as jwtSignOut } from '~/auth/context/auth/action';

// ----------------------------------------------------------------------

const signOut = jwtSignOut;

// ----------------------------------------------------------------------

export function SignOutButton({ onClose, ...other }) {
    const router = useRouter();

    const { checkUserSession } = useAuthContext();

    const { logout: signOutAuth0 } = useAuth0();

    const handleLogout = useCallback(async () => {
        try {
            await signOut();
            await checkUserSession?.();

            onClose?.();
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error('Unable to logout!');
        }
    }, [checkUserSession, onClose, router]);

    const handleLogoutAuth0 = useCallback(async () => {
        try {
            await signOutAuth0();

            onClose?.();
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error('Unable to logout!');
        }
    }, [onClose, router, signOutAuth0]);

    return (
        <Button
            fullWidth
            variant="soft"
            size="large"
            color="error"
            onClick={CONFIG.auth.method === 'auth0' ? handleLogoutAuth0 : handleLogout}
            {...other}
        >
            Logout
        </Button>
    );
}
