import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { RatingView } from '~/sections/_examples/mui/rating-view';

// ----------------------------------------------------------------------

const metadata = { title: `Rating | MUI - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <RatingView />
    </>
  );
}
