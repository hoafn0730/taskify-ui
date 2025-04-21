import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { AboutView } from '~/sections/about/view';

// ----------------------------------------------------------------------

const metadata = { title: `About us - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <AboutView />
        </>
    );
}
