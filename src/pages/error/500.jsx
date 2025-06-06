import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { View500 } from '~/sections/error';

// ----------------------------------------------------------------------

const metadata = { title: `500 Internal server error! | Error - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <View500 />
        </>
    );
}
