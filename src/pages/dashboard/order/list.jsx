import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { OrderListView } from '~/sections/order/view';

// ----------------------------------------------------------------------

const metadata = { title: `Order list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <OrderListView />
        </>
    );
}
