import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';
import { useGetPosts } from '~/actions/blog';

import { PostListHomeView } from '~/sections/blog/view';

// ----------------------------------------------------------------------

const metadata = { title: `Post list - ${CONFIG.site.name}` };

export default function Page() {
    const { posts, postsLoading } = useGetPosts();

    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <PostListHomeView posts={posts} loading={postsLoading} />
        </>
    );
}
