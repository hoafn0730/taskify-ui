import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { ComponentsView } from '~/sections/_examples/view';

// ----------------------------------------------------------------------

const metadata = { title: `All components | MUI - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <ComponentsView />
        </>
    );
}
