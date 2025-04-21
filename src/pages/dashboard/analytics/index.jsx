import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { OverviewAnalyticsView } from '~/sections/overview/analytics/view';

// ----------------------------------------------------------------------

const metadata = { title: `Analytics | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <OverviewAnalyticsView />
        </>
    );
}
