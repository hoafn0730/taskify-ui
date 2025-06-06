import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { PostListView } from '~/sections/blog/view';

// ----------------------------------------------------------------------

const metadata = { title: `Post list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <PostListView />
        </>
    );
}
