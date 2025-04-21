import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { ProductCreateView } from '~/sections/product/view';

// ----------------------------------------------------------------------

const metadata = { title: `Create a new product | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <ProductCreateView />
        </>
    );
}
