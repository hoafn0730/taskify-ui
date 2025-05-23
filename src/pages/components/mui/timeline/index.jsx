import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { TimelineView } from '~/sections/_examples/mui/timeline-view';

// ----------------------------------------------------------------------

const metadata = { title: `Timeline | MUI - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <TimelineView />
        </>
    );
}
