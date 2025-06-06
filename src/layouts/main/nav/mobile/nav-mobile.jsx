import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

import { paths } from '~/configs/paths';
import { usePathname } from '~/routes/hooks';

import Logo from '~/components/logo';
import { NavUl } from '~/components/nav-section';
import { Scrollbar } from '~/components/scrollbar';

import { NavList } from './nav-mobile-list';
import { SignInButton } from '~/layouts/components/sign-in-button';

// ----------------------------------------------------------------------

export function NavMobile({ data, open, onClose, slots, sx }) {
    const pathname = usePathname();

    useEffect(() => {
        if (open) {
            onClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <Drawer
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    display: 'flex',
                    flexDirection: 'column',
                    width: 'var(--layout-nav-mobile-width)',
                    ...sx,
                },
            }}
        >
            {slots?.topArea ?? (
                <Box display="flex" sx={{ pt: 3, pb: 2, pl: 2.5 }}>
                    <Logo />
                </Box>
            )}

            <Scrollbar fillContent>
                <Box component="nav" display="flex" flexDirection="column" flex="1 1 auto" sx={{ pb: 3 }}>
                    <NavUl>
                        {data.map((list) => (
                            <NavList key={list.title} data={list} />
                        ))}
                    </NavUl>
                </Box>
            </Scrollbar>

            {slots?.bottomArea ?? (
                <Box gap={1.5} display="flex" sx={{ px: 2.5, py: 3 }}>
                    <SignInButton fullWidth />

                    <Button fullWidth variant="contained" rel="noopener" target="_blank" href={paths.minimalStore}>
                        Purchase
                    </Button>
                </Box>
            )}
        </Drawer>
    );
}
