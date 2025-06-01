import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { OverviewAppView } from '~/sections/overview/summary/view';

const metadata = { title: `Summary | Dashboard - ${CONFIG.site.name}` };

export default function OverviewAppPage() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <OverviewAppView />
        </>
    );
}
