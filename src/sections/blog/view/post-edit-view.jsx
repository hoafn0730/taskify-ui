import { paths } from '~/configs/paths';

import { DashboardContent } from '~/layouts/dashboard';

import { CustomBreadcrumbs } from '~/components/custom-breadcrumbs';

import { PostNewEditForm } from '../post-new-edit-form';

// ----------------------------------------------------------------------

export function PostEditView({ post }) {
    return (
        <DashboardContent>
            <CustomBreadcrumbs
                heading="Edit"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Blog', href: paths.dashboard.post.root },
                    { name: post?.title },
                ]}
                sx={{ mb: { xs: 3, md: 5 } }}
            />

            <PostNewEditForm currentPost={post} />
        </DashboardContent>
    );
}
