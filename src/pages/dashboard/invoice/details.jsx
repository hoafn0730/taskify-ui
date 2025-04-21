import { Helmet } from 'react-helmet-async';

import { useParams } from '~/routes/hooks';

import { CONFIG } from '~/configs/config-global';
import { _invoices } from '~/_mock/_invoice';

import { InvoiceDetailsView } from '~/sections/invoice/view';

// ----------------------------------------------------------------------

const metadata = { title: `Invoice details | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    const { id = '' } = useParams();

    const currentInvoice = _invoices.find((invoice) => invoice.id === id);

    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <InvoiceDetailsView invoice={currentInvoice} />
        </>
    );
}
