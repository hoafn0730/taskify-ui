import Alert from '@mui/material/Alert';

import { useBoolean } from '~/hooks/use-boolean';

import { Main, CompactContent } from './main';
import { HeaderBase } from '../core/header-base';
import { LayoutSection } from '../core/layout-section';

// ----------------------------------------------------------------------

export function SimpleLayout({ sx, children, content }) {
    const mobileNavOpen = useBoolean();

    const layoutQuery = 'md';

    return (
        <LayoutSection
            /** **************************************
             * Header
             *************************************** */
            headerSection={
                <HeaderBase
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
                '--layout-simple-content-compact-width': '448px',
            }}
            sx={sx}
        >
            <Main>{content?.compact ? <CompactContent>{children}</CompactContent> : children}</Main>
        </LayoutSection>
    );
}
