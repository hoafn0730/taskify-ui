import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { CheckboxView } from '~/sections/_examples/mui/checkbox-view';

// ----------------------------------------------------------------------

const metadata = { title: `Checkbox | MUI - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <CheckboxView />
        </>
    );
}
