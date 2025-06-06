import { paths } from '~/configs/paths';

import { DashboardContent } from '~/layouts/dashboard';

import { CustomBreadcrumbs } from '~/components/custom-breadcrumbs';

import { InvoiceNewEditForm } from '../invoice-new-edit-form';

// ----------------------------------------------------------------------

export function InvoiceEditView({ invoice }) {
    return (
        <DashboardContent>
            <CustomBreadcrumbs
                heading="Edit"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Invoice', href: paths.dashboard.invoice.root },
                    { name: invoice?.invoiceNumber },
                ]}
                sx={{ mb: { xs: 3, md: 5 } }}
            />

            <InvoiceNewEditForm currentInvoice={invoice} />
        </DashboardContent>
    );
}
