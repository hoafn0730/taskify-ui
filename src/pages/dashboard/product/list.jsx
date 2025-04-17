import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { ProductListView } from '~/sections/product/view';

// ----------------------------------------------------------------------

const metadata = { title: `Product list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProductListView />
    </>
  );
}
