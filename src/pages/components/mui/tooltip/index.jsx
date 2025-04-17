import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { TooltipView } from '~/sections/_examples/mui/tooltip-view';

// ----------------------------------------------------------------------

const metadata = { title: `Tooltip | MUI - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TooltipView />
    </>
  );
}
