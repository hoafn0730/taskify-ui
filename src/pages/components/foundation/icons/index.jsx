import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { IconsView } from '~/sections/_examples/foundation/icons-view';

// ----------------------------------------------------------------------

const metadata = { title: `Icons | Foundations - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <IconsView />
    </>
  );
}
