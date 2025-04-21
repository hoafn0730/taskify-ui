import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { TabsView } from '~/sections/_examples/mui/tabs-view';

// ----------------------------------------------------------------------

const metadata = { title: `Tabs | MUI - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <TabsView />
        </>
    );
}
