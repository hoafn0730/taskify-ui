import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { ShadowsView } from '~/sections/_examples/foundation/shadows-view';

// ----------------------------------------------------------------------

const metadata = { title: `Shadows | Foundations - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <ShadowsView />
        </>
    );
}
