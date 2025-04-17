import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { DataGridView } from '~/sections/_examples/mui/data-grid-view';

// ----------------------------------------------------------------------

const metadata = { title: `DataGrid | MUI - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DataGridView />
    </>
  );
}
