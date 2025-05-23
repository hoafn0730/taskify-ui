import { paths } from '~/configs/paths';

import { DashboardContent } from '~/layouts/dashboard';

import { CustomBreadcrumbs } from '~/components/custom-breadcrumbs';

import { ProductNewEditForm } from '../product-new-edit-form';

// ----------------------------------------------------------------------

export function ProductEditView({ product }) {
    return (
        <DashboardContent>
            <CustomBreadcrumbs
                heading="Edit"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Product', href: paths.dashboard.product.root },
                    { name: product?.name },
                ]}
                sx={{ mb: { xs: 3, md: 5 } }}
            />

            <ProductNewEditForm currentProduct={product} />
        </DashboardContent>
    );
}
