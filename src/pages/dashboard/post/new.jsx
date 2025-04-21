import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { PostCreateView } from '~/sections/blog/view';

// ----------------------------------------------------------------------

const metadata = { title: `Create a new post | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <PostCreateView />
        </>
    );
}
