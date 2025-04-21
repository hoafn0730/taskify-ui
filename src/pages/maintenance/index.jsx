import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { MaintenanceView } from '~/sections/maintenance/view';

// ----------------------------------------------------------------------

const metadata = { title: `Maintenance - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <MaintenanceView />
        </>
    );
}
