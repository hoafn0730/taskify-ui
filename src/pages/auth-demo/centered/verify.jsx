import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { CenteredVerifyView } from '~/sections/auth-demo/centered';

// ----------------------------------------------------------------------

const metadata = { title: `Verify | Layout centered - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <CenteredVerifyView />
        </>
    );
}
