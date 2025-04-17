import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { LightboxView } from '~/sections/_examples/extra/lightbox-view';

// ----------------------------------------------------------------------

const metadata = { title: `Lightbox | Components - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <LightboxView />
    </>
  );
}
