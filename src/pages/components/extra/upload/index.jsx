import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { UploadView } from '~/sections/_examples/extra/upload-view';

// ----------------------------------------------------------------------

const metadata = { title: `Upload | Components - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <UploadView />
        </>
    );
}
