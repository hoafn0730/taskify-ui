import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';

import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from '~/assets/icons';

import { Label } from '~/components/label';
import { Iconify } from '~/components/iconify';

import { useRouter } from '~/routes/hooks';
import { paths } from '~/configs/paths';

export function AccountBillingPlan({ plans }) {
    const router = useRouter();

    const [selectedPlan, setSelectedPlan] = useState('');

    const handleSelectPlan = useCallback(
        (newValue) => {
            const currentPlan = plans.filter((plan) => plan.primary)[0].subscription;
            if (currentPlan !== newValue) {
                setSelectedPlan(newValue);
            }
        },
        [plans],
    );

    const renderPlans = plans.map((plan) => (
        <Grid xs={12} md={4} key={plan.subscription}>
            <Paper
                variant="outlined"
                onClick={() => handleSelectPlan(plan.subscription)}
                sx={{
                    p: 2.5,
                    cursor: 'pointer',
                    position: 'relative',
                    ...(plan.primary && { opacity: 0.48, cursor: 'default' }),
                    ...(plan.subscription === selectedPlan && {
                        boxShadow: (theme) => `0 0 0 2px ${theme.vars.palette.text.primary}`,
                    }),
                }}
            >
                {plan.primary && (
                    <Label
                        color="info"
                        startIcon={<Iconify icon="eva:star-fill" />}
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                        Current
                    </Label>
                )}

                {plan.subscription === 'basic' && <PlanFreeIcon />}
                {plan.subscription === 'starter' && <PlanStarterIcon />}
                {plan.subscription === 'premium' && <PlanPremiumIcon />}

                <Box
                    sx={{
                        typography: 'subtitle2',
                        mt: 2,
                        mb: 0.5,
                        textTransform: 'capitalize',
                    }}
                >
                    {plan.subscription}
                </Box>

                <Stack direction="row" alignItems="center" sx={{ typography: 'h4' }}>
                    {plan.price || 'Free'}

                    {!!plan.price && (
                        <Box component="span" sx={{ typography: 'body2', color: 'text.disabled', ml: 0.5 }}>
                            /mo
                        </Box>
                    )}
                </Stack>
            </Paper>
        </Grid>
    ));

    return (
        <>
            <Card>
                <CardHeader title="Plan" />

                <Grid container spacing={2} sx={{ p: 3 }}>
                    {renderPlans}
                </Grid>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Stack spacing={1.5} direction="row" justifyContent="flex-end" sx={{ p: 3 }}>
                    <Button variant="outlined">Cancel plan</Button>
                    <Button variant="contained" onClick={() => router.push(paths.payment + `?plan=${selectedPlan}`)}>
                        Upgrade plan
                    </Button>
                </Stack>
            </Card>
        </>
    );
}
