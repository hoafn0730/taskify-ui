import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { InvoiceCreateView } from '~/sections/invoice/view';

// ----------------------------------------------------------------------

const metadata = { title: `Create a new invoice | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <InvoiceCreateView />
        </>
    );
}
