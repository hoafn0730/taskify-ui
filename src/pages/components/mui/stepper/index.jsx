import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { StepperView } from '~/sections/_examples/mui/stepper-view';

// ----------------------------------------------------------------------

const metadata = { title: `Stepper | MUI - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <StepperView />
    </>
  );
}
