import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { CheckoutView } from '~/sections/checkout/view';

// ----------------------------------------------------------------------

const metadata = { title: `Checkout - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CheckoutView />
    </>
  );
}
