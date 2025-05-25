import Button from '@mui/material/Button';

import { RouterLink } from '~/components/router-link';

import { paths } from '~/configs/paths';
import { useTranslate } from '~/locales';

export function SignUpButton({ sx, ...other }) {
    const { t } = useTranslate('header');
    return (
        <Button component={RouterLink} href={paths.auth.signUp} variant="contained" sx={sx} {...other}>
            {t('header.navigation.signUp')}
        </Button>
    );
}
