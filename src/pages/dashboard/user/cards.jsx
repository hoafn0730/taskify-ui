import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { UserCardsView } from '~/sections/user/view';

// ----------------------------------------------------------------------

const metadata = { title: `User cards | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <UserCardsView />
    </>
  );
}
