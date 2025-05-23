import { paths } from '~/configs/paths';

import { DashboardContent } from '~/layouts/dashboard';

import { CustomBreadcrumbs } from '~/components/custom-breadcrumbs';

import { UserNewEditForm } from '../user-new-edit-form';

// ----------------------------------------------------------------------

export function UserEditView({ user: currentUser }) {
    return (
        <DashboardContent>
            <CustomBreadcrumbs
                heading="Edit"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'User', href: paths.dashboard.user.root },
                    { name: currentUser?.name },
                ]}
                sx={{ mb: { xs: 3, md: 5 } }}
            />

            <UserNewEditForm currentUser={currentUser} />
        </DashboardContent>
    );
}
