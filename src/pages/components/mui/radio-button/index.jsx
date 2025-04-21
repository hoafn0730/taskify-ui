import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { RadioButtonView } from '~/sections/_examples/mui/radio-button-view';

// ----------------------------------------------------------------------

const metadata = { title: `Radio button | MUI - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <RadioButtonView />
        </>
    );
}
