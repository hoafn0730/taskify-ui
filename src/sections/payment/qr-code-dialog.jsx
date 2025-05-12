import { useEffect } from 'react';
import { toast } from 'sonner';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from '~/components/iconify';
import { Image } from '~/components/image';
import socket from '~/utils/socket';

const ACC = '0975882405';
const BANK = 'MBBank';

export function QrCodeDialog({ onClose, ...other }) {
    const des = `Upgrade plan - `;

    useEffect(() => {
        socket.on('transaction-update', (data) => {
            console.log('Transaction update received:', data);
            toast.success('Transaction successfully:');

            setTimeout(() => {
                window.location.reload();
            }, 3000);
        });

        return () => {
            socket.off('transaction-update');
        };
    }, []);

    return (
        <Dialog maxWidth="md" onClose={onClose} {...other}>
            <DialogTitle> Qr code </DialogTitle>

            <DialogContent sx={{ overflow: 'unset' }}>
                <Stack spacing={2.5}>
                    <Image
                        src={`https://qr.sepay.vn/img?acc=${ACC}&bank=${BANK}&amount=${'10000'}&des=${encodeURIComponent(
                            des,
                        )}`}
                        alt={'course?.title'}
                        style={{ margin: '0 auto' }}
                    />
                </Stack>
            </DialogContent>

            <DialogActions></DialogActions>
        </Dialog>
    );
}
