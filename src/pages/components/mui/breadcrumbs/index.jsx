import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { BreadcrumbsView } from '~/sections/_examples/mui/breadcrumbs-view';

// ----------------------------------------------------------------------

const metadata = { title: `Breadcrumbs | MUI - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <BreadcrumbsView />
        </>
    );
}
