import Button from '@mui/material/Button';

import { RouterLink } from '~/components/router-link';

import { paths } from '~/configs/paths';

export function SignUpButton({ sx, ...other }) {
    return (
        <Button component={RouterLink} href={paths.auth.signUp} variant="contained" sx={sx} {...other}>
            Sign up
        </Button>
    );
}
