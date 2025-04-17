import { paths } from '~/routes/paths';

import { DashboardContent } from '~/layouts/dashboard';

import { CustomBreadcrumbs } from '~/components/custom-breadcrumbs';

import { JobNewEditForm } from '../job-new-edit-form';

// ----------------------------------------------------------------------

export function JobEditView({ job }) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Job', href: paths.dashboard.job.root },
          { name: job?.title },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <JobNewEditForm currentJob={job} />
    </DashboardContent>
  );
}
