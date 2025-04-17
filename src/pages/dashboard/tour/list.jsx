import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { TourListView } from '~/sections/tour/view';

// ----------------------------------------------------------------------

const metadata = { title: `Tour list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TourListView />
    </>
  );
}
