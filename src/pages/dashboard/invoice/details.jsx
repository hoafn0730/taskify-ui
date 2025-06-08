import { Helmet } from 'react-helmet-async';

import { useParams } from '~/routes/hooks';

import { CONFIG } from '~/configs/config-global';
import { _invoices } from '~/_mock/_invoice';

import { InvoiceDetailsView } from '~/sections/invoice/view';
import { invoiceService } from '~/services/invoiceService';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const metadata = { title: `Invoice details | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    const { id = '' } = useParams();
    const [invoice, setInvoice] = useState();

    useEffect(() => {
        invoiceService.getInvoice(id).then((res) => setInvoice(res.data));
    }, [id]);

    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <InvoiceDetailsView invoice={invoice} />
        </>
    );
}
