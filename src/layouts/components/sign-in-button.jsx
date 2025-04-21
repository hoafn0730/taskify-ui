import Button from '@mui/material/Button';

import { RouterLink } from '~/components/router-link';

import { CONFIG } from '~/configs/config-global';

// ----------------------------------------------------------------------

// eslint-disable-next-line react/prop-types
export function SignInButton({ sx, ...other }) {
    return (
        <Button component={RouterLink} href={CONFIG.auth.redirectPath} variant="outlined" sx={sx} {...other}>
            Sign in
        </Button>
    );
}
