import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { OverviewBookingView } from '~/sections/overview/booking/view';

// ----------------------------------------------------------------------

const metadata = { title: `Booking | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <OverviewBookingView />
        </>
    );
}
