import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { FileManagerView } from '~/sections/file-manager/view';

// ----------------------------------------------------------------------

const metadata = { title: `File manager | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <FileManagerView />
        </>
    );
}
