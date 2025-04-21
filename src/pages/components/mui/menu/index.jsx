import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { MenuView } from '~/sections/_examples/mui/menu-view';

// ----------------------------------------------------------------------

const metadata = { title: `Menu | MUI - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <MenuView />
        </>
    );
}
