import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { NotFoundView } from '~/sections/error';

// ----------------------------------------------------------------------

const metadata = { title: `404 page not found! | Error - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <NotFoundView />
        </>
    );
}
