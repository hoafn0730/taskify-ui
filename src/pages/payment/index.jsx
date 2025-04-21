import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { PaymentView } from '~/sections/payment/view';

// ----------------------------------------------------------------------

const metadata = { title: `Payment - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <PaymentView />
        </>
    );
}
