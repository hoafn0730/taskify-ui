import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { CenteredSignUpView } from '~/sections/auth-demo/centered';

// ----------------------------------------------------------------------

const metadata = { title: `Sign up | Layout centered - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <CenteredSignUpView />
        </>
    );
}
