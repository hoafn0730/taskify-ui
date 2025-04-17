import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { PopoverView } from '~/sections/_examples/mui/popover-view';

// ----------------------------------------------------------------------

const metadata = { title: `Popover | MUI - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PopoverView />
    </>
  );
}
