import { paths } from '~/configs/paths';

import { DashboardContent } from '~/layouts/dashboard';

import { CustomBreadcrumbs } from '~/components/custom-breadcrumbs';

import { TourNewEditForm } from '../tour-new-edit-form';

// ----------------------------------------------------------------------

export function TourEditView({ tour }) {
    return (
        <DashboardContent>
            <CustomBreadcrumbs
                heading="Edit"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Tour', href: paths.dashboard.kanban.root },
                    { name: tour?.name },
                ]}
                sx={{ mb: { xs: 3, md: 5 } }}
            />

            <TourNewEditForm currentTour={tour} />
        </DashboardContent>
    );
}
