import Button from '@mui/material/Button';

import { RouterLink } from '~/components/router-link';

import { paths } from '~/configs/paths';

export function GoToDashboardButton({ sx, ...other }) {
    return (
        <Button component={RouterLink} href={paths.dashboard.root} variant="contained" sx={sx} {...other}>
            Go to your dashboard
        </Button>
    );
}
