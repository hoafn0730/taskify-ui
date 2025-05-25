import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

import { RouterLink } from '~/components/router-link';

import { paths } from '~/configs/paths';

export function GoToDashboardButton({ sx, ...other }) {
    const { user } = useSelector((state) => state.user);

    return (
        <Button
            component={RouterLink}
            href={user.role === 'admin' ? paths.dashboard.root : paths.dashboard.summary}
            variant="contained"
            sx={sx}
            {...other}
        >
            Go to your dashboard
        </Button>
    );
}
