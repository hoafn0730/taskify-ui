import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { MemberListView } from '~/sections/member/view';

// ----------------------------------------------------------------------

const metadata = { title: `Member list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <MemberListView />
        </>
    );
}
