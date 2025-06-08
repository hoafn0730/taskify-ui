import { paths } from '~/configs/paths';

import { DashboardContent } from '~/layouts/dashboard';

import { CustomBreadcrumbs } from '~/components/custom-breadcrumbs';

import { InvoiceDetails } from '../invoice-details';

// ----------------------------------------------------------------------

export function InvoiceDetailsView({ invoice }) {
    return (
        <DashboardContent>
            <CustomBreadcrumbs
                heading={invoice?.code || 'Invoice'}
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Invoice', href: paths.dashboard.invoice.root },
                    { name: invoice?.code || 'Invoice' },
                ]}
                sx={{ mb: { xs: 3, md: 5 } }}
            />

            <InvoiceDetails invoice={invoice} />
        </DashboardContent>
    );
}
