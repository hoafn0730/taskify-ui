import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { ColorsView } from '~/sections/_examples/foundation/colors-view';

// ----------------------------------------------------------------------

const metadata = { title: `Colors | Foundations - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ColorsView />
    </>
  );
}
