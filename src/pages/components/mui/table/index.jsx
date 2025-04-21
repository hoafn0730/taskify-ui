import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { TableView } from '~/sections/_examples/mui/table-view';

// ----------------------------------------------------------------------

const metadata = { title: `Table | MUI - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <TableView />
        </>
    );
}
