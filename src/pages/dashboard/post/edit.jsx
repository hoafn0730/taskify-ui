import { Helmet } from 'react-helmet-async';

import { useParams } from '~/routes/hooks';

import { CONFIG } from '~/config-global';
import { useGetPost } from '~/actions/blog';

import { PostEditView } from '~/sections/blog/view';

// ----------------------------------------------------------------------

const metadata = { title: `Post edit | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { title = '' } = useParams();

  const { post } = useGetPost(title);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PostEditView post={post} />
    </>
  );
}
