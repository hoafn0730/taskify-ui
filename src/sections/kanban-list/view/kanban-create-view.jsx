import { paths } from '~/configs/paths';

import { DashboardContent } from '~/layouts/dashboard';

import { CustomBreadcrumbs } from '~/components/custom-breadcrumbs';

import { KanbanNewEditForm } from '../kanban-new-edit-form';

export function TourCreateView() {
    return (
        <DashboardContent>
            <CustomBreadcrumbs
                heading="Create a new tour"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Tour', href: paths.dashboard.kanban.root },
                    { name: 'New tour' },
                ]}
                sx={{ mb: { xs: 3, md: 5 } }}
            />

            <KanbanNewEditForm />
        </DashboardContent>
    );
}
