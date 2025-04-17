import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { ScrollbarView } from '~/sections/_examples/extra/scrollbar-view';

// ----------------------------------------------------------------------

const metadata = { title: `Scrollbar | Components - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ScrollbarView />
    </>
  );
}
