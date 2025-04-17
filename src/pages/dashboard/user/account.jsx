import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { AccountView } from '~/sections/account/view';

// ----------------------------------------------------------------------

const metadata = { title: `Account settings | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AccountView />
    </>
  );
}
