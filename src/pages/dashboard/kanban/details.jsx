import { Helmet } from 'react-helmet-async';

import { useParams } from '~/routes/hooks';

import { _tours } from '~/_mock/_tour';
import { CONFIG } from '~/configs/config-global';

import { TourDetailsView } from '~/sections/tour/view';

// ----------------------------------------------------------------------

const metadata = { title: `Tour details | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    const { id = '' } = useParams();

    const currentTour = _tours.find((tour) => tour.id === id);

    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <TourDetailsView tour={currentTour} />
        </>
    );
}
