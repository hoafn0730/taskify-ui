import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { TypographyView } from '~/sections/_examples/foundation/typography-view';

// ----------------------------------------------------------------------

const metadata = { title: `Typography | Foundations - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TypographyView />
    </>
  );
}
