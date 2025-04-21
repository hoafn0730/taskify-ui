import Box from '@mui/material/Box';

import { layoutClasses } from '../classes';

// ----------------------------------------------------------------------

// eslint-disable-next-line react/prop-types
export function Main({ children, sx, ...other }) {
    return (
        <Box
            component="main"
            className={layoutClasses.main}
            sx={{
                display: 'flex',
                flex: '1 1 auto',
                flexDirection: 'column',
                ...sx,
            }}
            {...other}
        >
            {children}
        </Box>
    );
}
