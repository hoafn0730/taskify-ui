import styled from '@emotion/styled';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Iconify } from '~/components/iconify';

const DrawerHeader = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'center',
}));

function MenuHeader({ title, onBack, onClose }) {
    return (
        <DrawerHeader>
            {!!onBack && (
                <IconButton sx={{ position: 'absolute', left: 6 }} onClick={onBack}>
                    <Iconify width={24} icon="iconamoon:arrow-left-2-light" />
                </IconButton>
            )}
            <Typography variant="span" sx={{ fontSize: '16px', fontWeight: 600 }}>
                {title}
            </Typography>
            <IconButton sx={{ position: 'absolute', right: 6 }} onClick={onClose}>
                <Iconify icon="mingcute:close-line" />
            </IconButton>
        </DrawerHeader>
    );
}

export default MenuHeader;
