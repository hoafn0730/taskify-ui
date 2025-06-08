import { useEffect } from 'react';
import { toast } from 'sonner';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';

import { Image } from '~/components/image';
import { fNumber } from '~/utils/format-number';
import { userService } from '~/services/userService';

import io from 'socket.io-client';
import { useRouter } from '~/routes/hooks';

const ACC = '0975882405';
const BANK = 'MBBank';

const socket = io('http://localhost:5000', {
    withCredentials: true,
});

export function QrCodeDialog({ currentPlan, onClose, ...other }) {
    const des = `Upgrade plan ${currentPlan.subscription}`;
    const amount = currentPlan.price;
    const router = useRouter();

    useEffect(() => {
        const handleTransaction = async (data) => {
            await toast.promise(userService.transaction(data), {
                loading: 'Processing transaction...',
                success: () => 'Transaction completed successfully!',
                error: 'An error occurred while processing the transaction.',
                closeButton: false,
            });

            onClose();

            await setTimeout(() => router.push('/dashboard/summary'), 3000);
        };

        socket.on('transaction', handleTransaction);

        return () => {
            socket.off('transaction');
        };
    }, [onClose]);

    const renderPrice = (
        <Stack direction="row" justifyContent="flex-end" alignItems="center">
            <Typography variant="h4">đ</Typography>

            <Typography variant="h3">{fNumber(amount)}</Typography>

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

    return (
        <Dialog maxWidth="md" onClose={onClose} {...other}>
            <DialogTitle sx={{ display: 'flex', flexDirection: 'column' }}>
                Qr code
                <Typography
                    component="span"
                    sx={{
                        typography: 'body2',
                        color: 'text.disabled',
                    }}
                >
                    Scan to pay
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ overflow: 'unset' }}>
                <Stack spacing={2.5}>
                    <Image
                        src={`https://qr.sepay.vn/img?acc=${ACC}&bank=${BANK}&amount=${'10000'}&des=${encodeURIComponent(
                            des,
                        )}`}
                        alt={'qr-code'}
                        style={{ margin: '0 auto' }}
                    />
                </Stack>
                {renderPrice}
            </DialogContent>

            <DialogActions>
                <Button variant="contained" color="inherit" sx={{ width: '100%' }} onClick={onClose}>
                    Other payment methods
                </Button>
            </DialogActions>
        </Dialog>
    );
}
