import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { SplitUpdatePasswordView } from '~/sections/auth-demo/split';

// ----------------------------------------------------------------------

const metadata = { title: `Update password | Layout split - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <SplitUpdatePasswordView />
        </>
    );
}
