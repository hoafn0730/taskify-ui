import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { GridView } from '~/sections/_examples/foundation/grid-view';

// ----------------------------------------------------------------------

const metadata = { title: `Grid | Foundations - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <GridView />
        </>
    );
}
