import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { AlertView } from '~/sections/_examples/mui/alert-view';

// ----------------------------------------------------------------------

const metadata = { title: `Alert | MUI - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <AlertView />
        </>
    );
}
