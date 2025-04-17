import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { MegaMenuView } from '~/sections/_examples/extra/mega-menu-view';

// ----------------------------------------------------------------------

const metadata = { title: `Mega menu | Components - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <MegaMenuView />
    </>
  );
}
