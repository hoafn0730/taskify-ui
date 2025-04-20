import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@mui/material/Button';

import { useRouter } from '~/routes/hooks';

import { CONFIG } from '~/config-global';

import { toast } from '~/components/snackbar';

import { checkUserSession } from '~/store/slices/userSlice';
import { signOut } from '~/store/actions/userAction';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function SignOutButton({ onClose, ...other }) {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogout = useCallback(async () => {
        try {
            dispatch(signOut());
            dispatch(checkUserSession());

            onClose?.();
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error('Unable to logout!');
        }
    }, [dispatch, onClose, router]);

    return (
        <Button fullWidth variant="soft" size="large" color="error" onClick={handleLogout} {...other}>
            Logout
        </Button>
    );
}
