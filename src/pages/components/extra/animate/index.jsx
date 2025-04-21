import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { AnimateView } from '~/sections/_examples/extra/animate-view';

// ----------------------------------------------------------------------

const metadata = { title: `Animate | Components - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <AnimateView />
        </>
    );
}
