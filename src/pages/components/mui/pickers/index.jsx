import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { PickerView } from '~/sections/_examples/mui/picker-view';

// ----------------------------------------------------------------------

const metadata = { title: `Date picker | MUI - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <PickerView />
        </>
    );
}
