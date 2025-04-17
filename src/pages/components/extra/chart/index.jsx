import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { ChartView } from '~/sections/_examples/extra/chart-view';

// ----------------------------------------------------------------------

const metadata = { title: `Chart | Components - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ChartView />
    </>
  );
}
