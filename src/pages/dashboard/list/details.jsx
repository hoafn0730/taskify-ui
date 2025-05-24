import { Helmet } from 'react-helmet-async';

import { useParams } from '~/routes/hooks';

import { _orders } from '~/_mock/_order';
import { CONFIG } from '~/configs/config-global';

import { OrderDetailsView } from '~/sections/order/view';

// ----------------------------------------------------------------------

const metadata = { title: `Order details | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    const { id = '' } = useParams();

    const currentOrder = _orders.find((order) => order.id === id);

    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <OrderDetailsView order={currentOrder} />
        </>
    );
}
