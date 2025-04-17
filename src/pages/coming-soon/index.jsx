import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { ComingSoonView } from '~/sections/coming-soon/view';

// ----------------------------------------------------------------------

const metadata = { title: `Coming soon - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ComingSoonView />
    </>
  );
}
