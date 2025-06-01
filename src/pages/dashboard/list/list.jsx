import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { ListView } from '~/sections/list/view';

const metadata = { title: `List | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <ListView />
        </>
    );
}
