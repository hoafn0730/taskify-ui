import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { Label } from '~/components/label';
import { Iconify } from '~/components/iconify';
import { useBoolean } from '~/hooks/use-boolean';
import { QrCodeDialog } from './qr-code-dialog';
import { fNumber } from '~/utils/format-number';
import { _pricingPlans } from '~/_mock';

// ----------------------------------------------------------------------

export function PaymentSummary({ method, plan, sx, ...other }) {
    const qrCode = useBoolean();

    const currentPlan = _pricingPlans.find((item) => item.subscription === plan);

    const renderPrice = (
        <Stack direction="row" justifyContent="flex-end">
            <Typography variant="h4">đ</Typography>

            <Typography variant="h2">{fNumber(currentPlan.price)}</Typography>

            <Typography
                component="span"
                sx={{
                    ml: 1,
                    alignSelf: 'center',
                    typography: 'body2',
                    color: 'text.disabled',
                }}
            >
                / mo
            </Typography>
        </Stack>
    );

    const handleUpgradePlan = () => {
        switch (method) {
            case 'bank': {
                qrCode.onTrue();
                break;
            }
            default:
                break;
        }
    };

    return (
        <Box
            sx={{
                p: 5,
                borderRadius: 2,
                bgcolor: 'background.neutral',
                ...sx,
            }}
            {...other}
        >
            <Typography variant="h6" sx={{ mb: 5 }}>
                Summary
            </Typography>

            <Stack spacing={2.5}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Subscription
                    </Typography>

                    <Label color="error">{currentPlan.subscription.toUpperCase()}</Label>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Billed monthly
                    </Typography>
                    <Switch defaultChecked />
                </Stack>

                {renderPrice}

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1">Total billed</Typography>

                    <Typography variant="subtitle1">đ{fNumber(currentPlan.price)}</Typography>
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />
            </Stack>

            <Typography component="div" variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
                * Plus applicable taxes
            </Typography>

            <Button fullWidth size="large" variant="contained" sx={{ mt: 5, mb: 3 }} onClick={handleUpgradePlan}>
                Upgrade plan
            </Button>

            <Stack alignItems="center" spacing={1}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify icon="solar:shield-check-bold" sx={{ color: 'success.main' }} />
                    <Typography variant="subtitle2">Secure credit card payment</Typography>
                </Stack>

                <Typography variant="caption" sx={{ color: 'text.disabled', textAlign: 'center' }}>
                    This is a secure 128-bit SSL encrypted payment
                </Typography>
            </Stack>

            <QrCodeDialog currentPlan={currentPlan} open={qrCode.value} onClose={qrCode.onFalse} />
        </Box>
    );
}
