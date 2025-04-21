import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { InvoiceListView } from '~/sections/invoice/view';

// ----------------------------------------------------------------------

const metadata = { title: `Invoice list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <InvoiceListView />
        </>
    );
}
