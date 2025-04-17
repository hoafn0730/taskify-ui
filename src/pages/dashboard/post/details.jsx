import { Helmet } from 'react-helmet-async';

import { useParams } from '~/routes/hooks';

import { CONFIG } from '~/config-global';
import { useGetPost } from '~/actions/blog';

import { PostDetailsView } from '~/sections/blog/view';

// ----------------------------------------------------------------------

const metadata = { title: `Post details | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { title = '' } = useParams();

  const { post, postLoading, postError } = useGetPost(title);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PostDetailsView post={post} loading={postLoading} error={postError} />
    </>
  );
}
