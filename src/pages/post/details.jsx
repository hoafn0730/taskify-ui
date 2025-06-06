import { Helmet } from 'react-helmet-async';

import { useParams } from '~/routes/hooks';

import { CONFIG } from '~/configs/config-global';
import { useGetPost, useGetLatestPosts } from '~/actions/blog';

import { PostDetailsHomeView } from '~/sections/blog/view';

// ----------------------------------------------------------------------

const metadata = { title: `Post details - ${CONFIG.site.name}` };

export default function Page() {
    const { title = '' } = useParams();

    const { post, postLoading, postError } = useGetPost(title);

    const { latestPosts } = useGetLatestPosts(title);

    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <PostDetailsHomeView post={post} latestPosts={latestPosts} loading={postLoading} error={postError} />
        </>
    );
}
