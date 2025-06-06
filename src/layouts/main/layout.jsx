import { useSelector } from 'react-redux';

import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';

import { usePathname } from '~/routes/hooks';

import { useBoolean } from '~/hooks/use-boolean';

import { Main } from './main';
import { NavMobile } from './nav/mobile';
import { NavDesktop } from './nav/desktop';
import { Footer, HomeFooter } from './footer';
import { HeaderBase } from '../core/header-base';
import { LayoutSection } from '../core/layout-section';
import { navData as mainNavData } from '~/configs/config-nav-main';
import { useTranslate } from '~/locales';

// ----------------------------------------------------------------------

export function MainLayout({ sx, data, children }) {
    const theme = useTheme();
    const { user } = useSelector((state) => state.user);
    const { t } = useTranslate('header');

    const pathname = usePathname();

    const mobileNavOpen = useBoolean();

    const homePage = pathname === '/';

    const layoutQuery = 'md';

    const navData = data?.nav ?? mainNavData(t);

    return (
        <>
            <NavMobile data={navData} open={mobileNavOpen.value} onClose={mobileNavOpen.onFalse} />

            <LayoutSection
                /** **************************************
                 * Header
                 *************************************** */
                headerSection={
                    <HeaderBase
                        layoutQuery={layoutQuery}
                        onOpenNav={mobileNavOpen.onTrue}
                        slotsDisplay={{
                            goToDashboard: user,
                            signIn: !user,
                            signUp: !user,

                            purchase: false,
                            account: false,
                            contacts: false,
                            searchbar: false,
                            workspaces: false,
                            localization: false,
                            notifications: false,
                        }}
                        slots={{
                            topArea: (
                                <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                                    This is an info Alert.
                                </Alert>
                            ),
                            rightAreaStart: (
                                <NavDesktop
                                    data={navData}
                                    sx={{
                                        display: 'none',
                                        [theme.breakpoints.up(layoutQuery)]: {
                                            mr: 2.5,
                                            display: 'flex',
                                        },
                                    }}
                                />
                            ),
                        }}
                    />
                }
                /** **************************************
                 * Footer
                 *************************************** */
                footerSection={homePage ? <HomeFooter /> : <Footer layoutQuery={layoutQuery} />}
                /** **************************************
                 * Style
                 *************************************** */
                sx={sx}
            >
                <Main>{children}</Main>
            </LayoutSection>
        </>
    );
}
