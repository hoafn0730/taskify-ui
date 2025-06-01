import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { styled, useTheme } from '@mui/material/styles';

import { paths } from '~/configs/paths';
import { RouterLink } from '~/components/router-link';

import Logo from '~/components/logo';

import { HeaderSection } from './header-section';
import { Searchbar } from '../components/searchbar';
import { MenuButton } from '../components/menu-button';
import { SignInButton } from '../components/sign-in-button';
import { AccountDrawer } from '../components/account-drawer';
import { SettingsButton } from '../components/settings-button';
import { LanguagePopover } from '../components/language-popover';
import { FriendsPopover } from '../components/friends-popover';
import { WorkspacesPopover } from '../components/workspaces-popover';
import { NotificationsDrawer } from '../components/notifications-drawer';
import { SignUpButton } from '../components/sign-up-button';
import { GoToDashboardButton } from '../components/go-to-dashboard-button';
import { useTranslate } from '~/locales';

// ----------------------------------------------------------------------

const StyledDivider = styled('span')(({ theme }) => ({
    width: 1,
    height: 10,
    flexShrink: 0,
    display: 'none',
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'column',
    marginLeft: theme.spacing(2.5),
    marginRight: theme.spacing(2.5),
    backgroundColor: 'currentColor',
    color: theme.vars.palette.divider,
    '&::before, &::after': {
        top: -5,
        width: 3,
        height: 3,
        content: '""',
        flexShrink: 0,
        borderRadius: '50%',
        position: 'absolute',
        backgroundColor: 'currentColor',
    },
    '&::after': { bottom: -5, top: 'auto' },
}));

// ----------------------------------------------------------------------

export function HeaderBase({
    sx,
    data,
    slots,
    slotProps,
    onOpenNav,
    layoutQuery,

    slotsDisplay: {
        signIn = true,
        signUp = true,
        goToDashboard = true,
        account = true,
        helpLink = true,
        settings = true,
        purchase = true,
        contacts = true,
        searchbar = true,
        workspaces = true,
        menuButton = true,
        localization = true,
        notifications = true,
    } = {},

    ...other
}) {
    const theme = useTheme();
    const { t } = useTranslate('header');

    return (
        <HeaderSection
            sx={sx}
            layoutQuery={layoutQuery}
            slots={{
                ...slots,
                leftAreaStart: slots?.leftAreaStart,
                leftArea: (
                    <>
                        {slots?.leftAreaStart}

                        {/* -- Menu button -- */}
                        {menuButton && (
                            <MenuButton
                                data-slot="menu-button"
                                onClick={onOpenNav}
                                sx={{
                                    mr: 1,
                                    ml: -1,
                                    [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                                }}
                            />
                        )}

                        {/* -- Logo -- */}
                        <Logo data-slot="logo" />

                        {/* -- Divider -- */}
                        <StyledDivider data-slot="divider" />

                        {/* -- Workspace popover -- */}
                        {workspaces && <WorkspacesPopover data-slot="workspaces" data={data?.workspaces} />}

                        {slots?.leftAreaEnd}
                    </>
                ),
                rightArea: (
                    <>
                        {slots?.rightAreaStart}

                        <Box
                            data-area="right"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: { xs: 1, sm: 1.5 },
                            }}
                        >
                            {/* -- Help link -- */}
                            {helpLink && (
                                <Link
                                    data-slot="help-link"
                                    href={paths.faqs}
                                    component={RouterLink}
                                    color="inherit"
                                    sx={{ typography: 'subtitle2' }}
                                >
                                    {t('header.navigation.needHelp')}
                                </Link>
                            )}

                            {/* -- Searchbar -- */}
                            {searchbar && <Searchbar data-slot="searchbar" data={data?.nav} />}

                            {/* -- Language popover -- */}
                            {localization && <LanguagePopover data-slot="localization" data={data?.langs} />}

                            {/* -- Notifications popover -- */}
                            {notifications && (
                                <NotificationsDrawer data-slot="notifications" data={data?.notifications} />
                            )}

                            {/* -- Contacts popover -- */}
                            {contacts && <FriendsPopover data-slot="friends" data={data?.friends} />}

                            {/* -- Settings button -- */}
                            {settings && <SettingsButton data-slot="settings" />}

                            {/* -- Account drawer -- */}
                            {account && <AccountDrawer data-slot="account" data={data?.account} />}

                            {/* -- Sign in button -- */}
                            {signIn && <SignInButton />}

                            {/* -- Sign up button -- */}
                            {signUp && <SignUpButton />}

                            {/* -- Go to dashboard button -- */}
                            {goToDashboard && <GoToDashboardButton />}

                            {/* -- Purchase button -- */}
                            {purchase && (
                                <Button
                                    data-slot="purchase"
                                    variant="contained"
                                    rel="noopener"
                                    target="_blank"
                                    href={paths.minimalStore}
                                    sx={{
                                        display: 'none',
                                        [theme.breakpoints.up(layoutQuery)]: {
                                            display: 'inline-flex',
                                        },
                                    }}
                                >
                                    {t('header.navigation.purchase')}
                                </Button>
                            )}
                        </Box>

                        {slots?.rightAreaEnd}
                    </>
                ),
            }}
            slotProps={slotProps}
            {...other}
        />
    );
}
