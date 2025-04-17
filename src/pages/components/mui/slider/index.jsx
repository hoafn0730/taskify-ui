import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { SliderView } from '~/sections/_examples/mui/slider-view';

// ----------------------------------------------------------------------

const metadata = { title: `Slider | MUI - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SliderView />
    </>
  );
}
