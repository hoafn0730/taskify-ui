import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { KanbanView } from '~/sections/kanban/view';

// ----------------------------------------------------------------------

const metadata = { title: `Kanban | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <KanbanView />
        </>
    );
}
