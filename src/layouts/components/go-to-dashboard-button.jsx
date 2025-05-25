import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

import { RouterLink } from '~/components/router-link';

import { paths } from '~/configs/paths';
import { useTranslate } from '~/locales';

export function GoToDashboardButton({ sx, ...other }) {
    const { user } = useSelector((state) => state.user);
    const { t } = useTranslate('header');

    return (
        <Button
            component={RouterLink}
            href={user.role === 'admin' ? paths.dashboard.root : paths.dashboard.summary}
            variant="contained"
            sx={sx}
            {...other}
        >
            {t('header.navigation.goToDashboard')}
        </Button>
    );
}
