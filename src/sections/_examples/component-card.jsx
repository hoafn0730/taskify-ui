import { m } from 'framer-motion';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

import { RouterLink } from '~/components/router-link';

import { varAlpha } from '~/theme/styles';

import { Label } from '~/components/label';
import { Image } from '~/components/image';
import { varHover, varTranHover } from '~/components/animate';

// ----------------------------------------------------------------------

export function ComponentCard({ item }) {
    return (
        <Paper
            component={RouterLink}
            href={item.href}
            variant="outlined"
            sx={{
                overflow: 'hidden',
                position: 'relative',
                textDecoration: 'none',
                borderColor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.12),
            }}
        >
            {item.category && (
                <Label
                    color={item.category === 'MUI X' ? 'info' : 'default'}
                    sx={{
                        top: 8,
                        right: 8,
                        zIndex: 9,
                        position: 'absolute',
                    }}
                >
                    {item.category}
                </Label>
            )}

            <CardActionArea
                component={m.div}
                whileHover="hover"
                sx={{
                    borderRadius: 0,
                    color: 'text.secondary',
                    bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
                }}
            >
                <m.div variants={varHover(1.1)} transition={varTranHover()}>
                    <Image alt={item.name} src={item.icon} ratio="1/1" sx={{ width: 200, maxWidth: 1 }} />
                </m.div>
            </CardActionArea>

            <Typography variant="subtitle2" sx={{ p: 2, textAlign: 'center' }}>
                {item.name}
            </Typography>
        </Paper>
    );
}
