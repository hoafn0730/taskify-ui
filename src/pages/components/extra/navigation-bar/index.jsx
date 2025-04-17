import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { NavigationBarView } from '~/sections/_examples/extra/navigation-bar-view';

// ----------------------------------------------------------------------

const metadata = { title: `Navigation bar | Components - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <NavigationBarView />
    </>
  );
}
