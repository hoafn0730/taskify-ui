import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { TextfieldView } from '~/sections/_examples/mui/textfield-view';

// ----------------------------------------------------------------------

const metadata = { title: `Textfield | MUI - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TextfieldView />
    </>
  );
}
