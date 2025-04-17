import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { ButtonView } from '~/sections/_examples/mui/button-view';

// ----------------------------------------------------------------------

const metadata = { title: `Button | MUI - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ButtonView />
    </>
  );
}
