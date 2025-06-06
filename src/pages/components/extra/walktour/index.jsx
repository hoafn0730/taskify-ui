import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { WalktourView } from '~/sections/_examples/extra/walktour-view';

// ----------------------------------------------------------------------

const metadata = { title: `Walktour | Components - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <WalktourView />
        </>
    );
}
