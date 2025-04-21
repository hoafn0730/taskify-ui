import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { UserProfileView } from '~/sections/user/view';

// ----------------------------------------------------------------------

const metadata = { title: `User profile | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <UserProfileView />
        </>
    );
}
