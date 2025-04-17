import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { ContactView } from '~/sections/contact/view';

// ----------------------------------------------------------------------

const metadata = { title: `Contact us - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ContactView />
    </>
  );
}
