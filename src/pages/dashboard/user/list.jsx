import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { UserListView } from '~/sections/user/view';

// ----------------------------------------------------------------------

const metadata = { title: `User list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <UserListView />
    </>
  );
}
