import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { UserCreateView } from '~/sections/user/view';

// ----------------------------------------------------------------------

const metadata = { title: `Create a new user | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <UserCreateView />
        </>
    );
}
