import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { UtilitiesView } from '~/sections/_examples/extra/utilities-view';

// ----------------------------------------------------------------------

const metadata = { title: `Utilities | Components - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <UtilitiesView />
        </>
    );
}
