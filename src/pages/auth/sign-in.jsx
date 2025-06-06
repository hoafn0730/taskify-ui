import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { SignInView } from '~/sections/auth';

// ----------------------------------------------------------------------

const metadata = { title: `Sign in | ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <SignInView />
        </>
    );
}
