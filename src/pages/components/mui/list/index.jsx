import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { ListView } from '~/sections/_examples/mui/list-view';

// ----------------------------------------------------------------------

const metadata = { title: `List | MUI - ${CONFIG.site.name}` };

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
