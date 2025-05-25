import Button from '@mui/material/Button';

import { RouterLink } from '~/components/router-link';

import { CONFIG } from '~/configs/config-global';
import { useTranslate } from '~/locales';

// ----------------------------------------------------------------------

export function SignInButton({ sx, ...other }) {
    const { t } = useTranslate('header');
    return (
        <Button component={RouterLink} href={CONFIG.auth.redirectPath} variant="outlined" sx={sx} {...other}>
            {t('header.navigation.signIn')}
        </Button>
    );
}
