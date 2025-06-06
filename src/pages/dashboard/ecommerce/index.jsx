import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { OverviewEcommerceView } from '~/sections/overview/e-commerce/view';

// ----------------------------------------------------------------------

const metadata = { title: `E-commerce | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <OverviewEcommerceView />
        </>
    );
}
