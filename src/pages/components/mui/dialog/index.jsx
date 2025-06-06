import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { DialogView } from '~/sections/_examples/mui/dialog-view';

// ----------------------------------------------------------------------

const metadata = { title: `Dialog | MUI - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <DialogView />
        </>
    );
}
