import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { ImageView } from '~/sections/_examples/extra/image-view';

// ----------------------------------------------------------------------

const metadata = { title: `Image | Components - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ImageView />
    </>
  );
}
