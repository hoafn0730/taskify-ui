import { Helmet } from 'react-helmet-async';

import { useParams } from '~/routes/hooks';

import { CONFIG } from '~/config-global';
import { _userList } from '~/_mock/_user';

import { UserEditView } from '~/sections/user/view';

// ----------------------------------------------------------------------

const metadata = { title: `User edit | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { id = '' } = useParams();

  const currentUser = _userList.find((user) => user.id === id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <UserEditView user={currentUser} />
    </>
  );
}
