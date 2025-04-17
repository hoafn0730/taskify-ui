import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { PricingView } from '~/sections/pricing/view';

// ----------------------------------------------------------------------

const metadata = { title: `Pricing - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PricingView />
    </>
  );
}
