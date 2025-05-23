import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { CarouselView } from '~/sections/_examples/extra/carousel-view';

// ----------------------------------------------------------------------

const metadata = { title: `Carousel | Components - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <CarouselView />
        </>
    );
}
