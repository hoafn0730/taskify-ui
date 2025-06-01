import Grid from '@mui/material/Unstable_Grid2';

import { AccountBillingPlan } from './account-billing-plan';
import { AccountBillingHistory } from './account-billing-history';

export function AccountBilling({ cards, plans, invoices, addressBook }) {
    return (
        <Grid container spacing={5} disableEqualOverflow>
            <Grid xs={12} md={8}>
                <AccountBillingPlan plans={plans} cardList={cards} addressBook={addressBook} />
            </Grid>

            <Grid xs={12} md={4}>
                <AccountBillingHistory invoices={invoices} />
            </Grid>
        </Grid>
    );
}
