import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { TransferListView } from '~/sections/_examples/mui/transfer-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Transfer list | MUI - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <TransferListView />
        </>
    );
}
