import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { CenteredSignInView } from '~/sections/auth-demo/centered';

// ----------------------------------------------------------------------

const metadata = { title: `Sign in | Layout centered - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CenteredSignInView />
    </>
  );
}
