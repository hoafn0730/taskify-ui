import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { OrganizationalChartView } from '~/sections/_examples/extra/organizational-chart-view';

// ----------------------------------------------------------------------

const metadata = { title: `Organizational chart | Components - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <OrganizationalChartView />
        </>
    );
}
