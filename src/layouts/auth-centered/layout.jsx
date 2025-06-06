import Alert from '@mui/material/Alert';

import { useBoolean } from '~/hooks/use-boolean';

import { CONFIG } from '~/configs/config-global';
import { stylesMode } from '~/theme/styles';

import { Main } from './main';
import { HeaderBase } from '../core/header-base';
import { LayoutSection } from '../core/layout-section';

// ----------------------------------------------------------------------

export function AuthCenteredLayout({ sx, children }) {
    const mobileNavOpen = useBoolean();

    const layoutQuery = 'md';

    return (
        <LayoutSection
            /** **************************************
             * Header
             *************************************** */
            headerSection={
                <HeaderBase
                    disableElevation
                    layoutQuery={layoutQuery}
                    onOpenNav={mobileNavOpen.onTrue}
                    slotsDisplay={{
                        signIn: false,
                        signUp: false,
                        goToDashboard: false,
                        account: false,
                        purchase: false,
                        contacts: false,
                        searchbar: false,
                        workspaces: false,
                        menuButton: false,
                        localization: false,
                        notifications: false,
                    }}
                    slots={{
                        topArea: (
                            <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                                This is an info Alert.
                            </Alert>
                        ),
                    }}
                    slotProps={{ container: { maxWidth: false } }}
                    sx={{ position: { [layoutQuery]: 'fixed' } }}
                />
            }
            /** **************************************
             * Footer
             *************************************** */
            footerSection={null}
            /** **************************************
             * Style
             *************************************** */
            cssVars={{
                '--layout-auth-content-width': '420px',
            }}
            sx={{
                '&::before': {
                    width: 1,
                    height: 1,
                    zIndex: 1,
                    content: "''",
                    opacity: 0.24,
                    position: 'fixed',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundImage: `url(${CONFIG.site.basePath}/assets/background/background-3-blur.webp)`,
                    [stylesMode.dark]: { opacity: 0.08 },
                },
                ...sx,
            }}
        >
            <Main layoutQuery={layoutQuery}>{children}</Main>
        </LayoutSection>
    );
}
