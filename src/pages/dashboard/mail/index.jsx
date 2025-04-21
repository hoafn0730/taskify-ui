import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { MailView } from '~/sections/mail/view';

// ----------------------------------------------------------------------

const metadata = { title: `Mail | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <MailView />
        </>
    );
}
