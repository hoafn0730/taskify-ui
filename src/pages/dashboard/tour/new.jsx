import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { TourCreateView } from '~/sections/tour/view';

// ----------------------------------------------------------------------

const metadata = { title: `Create a new tour | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TourCreateView />
    </>
  );
}
