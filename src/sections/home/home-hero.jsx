import { useRef, useState } from 'react';
import { m, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar, { avatarClasses } from '@mui/material/Avatar';

import { paths } from '~/configs/paths';
import { RouterLink } from '~/components/router-link';

import { useResponsive } from '~/hooks/use-responsive';

import { _mock } from '~/_mock';
import { CONFIG } from '~/configs/config-global';
import { textGradient } from '~/theme/styles';

import { Iconify } from '~/components/iconify';
import { SvgColor } from '~/components/svg-color';
import { varFade, MotionContainer } from '~/components/animate';

import { HeroBackground } from './components/hero-background';
import { useTranslate } from '~/locales';

// ----------------------------------------------------------------------

const smKey = 'sm';
const mdKey = 'md';
const lgKey = 'lg';

export function HomeHero({ sx, ...other }) {
    const theme = useTheme();
    const { t } = useTranslate('home');

    const scroll = useScrollPercent();

    const mdUp = useResponsive('up', mdKey);

    const distance = mdUp ? scroll.percent : 0;

    const y1 = useTransformY(scroll.scrollY, distance * -7);
    const y2 = useTransformY(scroll.scrollY, distance * -6);
    const y3 = useTransformY(scroll.scrollY, distance * -5);
    const y4 = useTransformY(scroll.scrollY, distance * -4);

    const opacity = useTransform(scroll.scrollY, [0, 1], [1, mdUp ? Number((1 - scroll.percent / 100).toFixed(1)) : 1]);

    const renderHeading = (
        <MInview>
            <Box
                component="h1"
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                sx={{
                    ...theme.typography.h2,
                    my: 0,
                    mx: 'auto',
                    maxWidth: 1200,
                    fontFamily: theme.typography.fontSecondaryFamily,
                    [theme.breakpoints.up(lgKey)]: { fontSize: 72, lineHeight: '90px' },
                }}
            >
                <Box component="span" sx={{ width: 1, opacity: 0.24 }}>
                    {t('hero.tagline')}
                </Box>
                {t('hero.title.prefix')}
                <Box
                    component={m.span}
                    animate={{ backgroundPosition: '200% center' }}
                    transition={{
                        duration: 20,
                        ease: 'linear',
                        repeat: Infinity,
                        repeatType: 'reverse',
                    }}
                    sx={{
                        ...textGradient(
                            `300deg, ${theme.vars.palette.primary.main} 0%, ${theme.vars.palette.warning.main} 25%, ${theme.vars.palette.primary.main} 50%, ${theme.vars.palette.warning.main} 75%, ${theme.vars.palette.primary.main} 100%`,
                        ),
                        backgroundSize: '400%',
                        ml: { xs: 0.75, md: 1, xl: 1.5 },
                    }}
                >
                    Taskify
                </Box>
            </Box>
        </MInview>
    );

    const renderText = (
        <MInview>
            <Typography
                variant="body2"
                sx={{
                    mx: 'auto',
                    [theme.breakpoints.up(smKey)]: { whiteSpace: 'pre' },
                    [theme.breakpoints.up(lgKey)]: { fontSize: 20, lineHeight: '36px' },
                }}
            >
                {t('hero.subtitle')}
            </Typography>
        </MInview>
    );

    const renderRatings = (
        <MInview>
            <Box
                gap={1.5}
                display="flex"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="center"
                sx={{ typography: 'subtitle2' }}
            >
                <AvatarGroup sx={{ [`& .${avatarClasses.root}`]: { width: 32, height: 32 } }}>
                    {[...Array(3)].map((_, index) => (
                        <Avatar
                            key={_mock.fullName(index + 1)}
                            alt={_mock.fullName(index + 1)}
                            src={_mock.image.avatar(index + 1)}
                        />
                    ))}
                </AvatarGroup>
                {t('hero.socialProof.text')}
            </Box>
        </MInview>
    );

    const renderButtons = (
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={{ xs: 1.5, sm: 2, zIndex: 9999 }}>
            <MInview>
                <Stack alignItems="center" spacing={2.5}>
                    <Button
                        component={RouterLink}
                        href={paths.dashboard.root}
                        color="inherit"
                        size="large"
                        variant="contained"
                        endIcon={<Iconify width={24} icon="iconamoon:arrow-right-2-light" />}
                    >
                        <span>{t('hero.socialProof.cta')}</span>
                    </Button>
                </Stack>
            </MInview>
        </Box>
    );

    return (
        <Stack
            ref={scroll.elementRef}
            component="section"
            sx={{
                overflow: 'hidden',
                position: 'relative',
                [theme.breakpoints.up(mdKey)]: {
                    minHeight: 760,
                    height: '100vh',
                    maxHeight: 1440,
                    display: 'block',
                    willChange: 'opacity',
                    mt: 'calc(var(--layout-header-desktop-height) * -1)',
                },
                ...sx,
            }}
            {...other}
        >
            <Box
                component={m.div}
                style={{ opacity }}
                sx={{
                    width: 1,
                    display: 'flex',
                    position: 'relative',
                    flexDirection: 'column',
                    transition: theme.transitions.create(['opacity']),
                    [theme.breakpoints.up(mdKey)]: {
                        height: 1,
                        position: 'fixed',
                        maxHeight: 'inherit',
                    },
                }}
            >
                <Container
                    component={MotionContainer}
                    sx={{
                        py: 3,
                        gap: 5,
                        zIndex: 9,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        [theme.breakpoints.up(mdKey)]: {
                            flex: '1 1 auto',
                            justifyContent: 'center',
                            py: 'var(--layout-header-desktop-height)',
                        },
                    }}
                >
                    <Stack spacing={3} sx={{ textAlign: 'center' }}>
                        <m.div style={{ y: y1 }}>{renderHeading}</m.div>
                        <m.div style={{ y: y2 }}>{renderText}</m.div>
                    </Stack>
                    <m.div style={{ y: y3 }}>{renderRatings}</m.div>
                    <m.div style={{ y: y4 }}>{renderButtons}</m.div>
                </Container>

                <HeroBackground />
            </Box>
        </Stack>
    );
}

// ----------------------------------------------------------------------

function MInview({ children, component = m.div }) {
    return (
        <Box component={component} variants={varFade({ distance: 24 }).inUp}>
            {children}
        </Box>
    );
}

// ----------------------------------------------------------------------

function useTransformY(value, distance) {
    const physics = {
        mass: 0.1,
        damping: 20,
        stiffness: 300,
        restDelta: 0.001,
    };

    return useSpring(useTransform(value, [0, 1], [0, distance]), physics);
}

function useScrollPercent() {
    const elementRef = useRef(null);

    const { scrollY } = useScroll();

    const [percent, setPercent] = useState(0);

    useMotionValueEvent(scrollY, 'change', (scrollHeight) => {
        let heroHeight = 0;

        if (elementRef.current) {
            heroHeight = elementRef.current.offsetHeight;
        }

        const scrollPercent = Math.floor((scrollHeight / heroHeight) * 100);

        if (scrollPercent >= 100) {
            setPercent(100);
        } else {
            setPercent(Math.floor(scrollPercent));
        }
    });

    return { elementRef, percent, scrollY };
}
