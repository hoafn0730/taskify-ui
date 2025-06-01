import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

import { RouterLink } from '~/components/router-link';

import { CONFIG } from '~/configs/config-global';
import { useTranslate } from '~/locales';

// ----------------------------------------------------------------------

export function SignInButton({ sx, ...other }) {
    const { user } = useSelector((state) => state.user);

    const { t } = useTranslate('header');
    return (
        <Button
            component={RouterLink}
            href={user?.role === 'admin' ? CONFIG.auth.redirectPath[1] : CONFIG.auth.redirectPath[0]}
            variant="outlined"
            sx={sx}
            {...other}
        >
            {t('header.navigation.signIn')}
        </Button>
    );
}
