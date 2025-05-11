import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { KanbanProvider } from '~/actions/kanban/KanbanProvider';

import { CONFIG } from '~/configs/config-global';
import { KanbanListView } from '~/sections/kanban-list/view';

const metadata = { title: `Kanban list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <KanbanProvider>
                <KanbanListView />
            </KanbanProvider>
        </>
    );
}
