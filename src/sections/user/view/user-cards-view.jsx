import Button from '@mui/material/Button';

import { paths } from '~/configs/paths';
import { RouterLink } from '~/components/router-link';

import { _userCards } from '~/_mock';
import { DashboardContent } from '~/layouts/dashboard';

import { Iconify } from '~/components/iconify';
import { CustomBreadcrumbs } from '~/components/custom-breadcrumbs';

import { UserCardList } from '../user-card-list';

// ----------------------------------------------------------------------

export function UserCardsView() {
    return (
        <DashboardContent>
            <CustomBreadcrumbs
                heading="User cards"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'User', href: paths.dashboard.user.root },
                    { name: 'Cards' },
                ]}
                action={
                    <Button
                        component={RouterLink}
                        href={paths.dashboard.user.new}
                        variant="contained"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                    >
                        New user
                    </Button>
                }
                sx={{ mb: { xs: 3, md: 5 } }}
            />

            <UserCardList users={_userCards} />
        </DashboardContent>
    );
}
