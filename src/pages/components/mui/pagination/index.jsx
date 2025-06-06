import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { PaginationView } from '~/sections/_examples/mui/pagination-view';

// ----------------------------------------------------------------------

const metadata = { title: `Pagination | MUI - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <PaginationView />
        </>
    );
}
