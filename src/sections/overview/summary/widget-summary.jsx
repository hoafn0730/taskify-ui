import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import { fNumber } from '~/utils/format-number';

export function WidgetSummary({ title, total, sx, ...other }) {
    return (
        <Card
            sx={{
                display: 'flex',
                alignItems: 'center',
                p: 3,
                ...sx,
            }}
            {...other}
        >
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ typography: 'subtitle2' }}>{title}</Box>
                <Box sx={{ mt: 1.5, mb: 1, typography: 'h3' }}>{fNumber(total)}</Box>
                <Box sx={{ gap: 0.5, display: 'flex', alignItems: 'center' }}>
                    <Box component="span" sx={{ typography: 'body2', color: 'text.secondary' }}>
                        in last 7 days
                    </Box>
                </Box>
            </Box>
        </Card>
    );
}
