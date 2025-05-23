import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { DndView } from '~/sections/_examples/extra/dnd-view';

// ----------------------------------------------------------------------

const metadata = { title: `Dnd | Components - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <DndView />
        </>
    );
}
