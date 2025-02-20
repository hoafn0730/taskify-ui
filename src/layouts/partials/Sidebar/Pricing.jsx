import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import Modal from '~/components/Modal';
import socket from '~/utils/socket';
import { transactionService } from '~/services/transactionService';

const tiers = [
    {
        title: 'Free',
        price: '0',
        description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
        buttonText: 'Sign up for free',
        buttonVariant: 'outlined',
        buttonColor: 'primary',
    },
    {
        title: 'Professional',
        subheader: 'Recommended',
        price: '10000',
        description: [
            '20 users included',
            '10 GB of storage',
            'Help center access',
            'Priority email support',
            'Dedicated team',
            'Best deals',
            'Ai support',
        ],
        buttonText: 'Start now',
        buttonVariant: 'contained',
        buttonColor: 'secondary',
    },
    {
        title: 'Enterprise',
        price: '30000',
        description: ['50 users included', '30 GB of storage', 'Help center access', 'Phone & email support'],
        buttonText: 'Contact us',
        buttonVariant: 'outlined',
        buttonColor: 'primary',
    },
];

function Pricing() {
    const [open, setOpen] = useState(false);
    const [payment, setPayment] = useState(false);
    const [tier, setTier] = useState(null);
    const [transaction, setTransaction] = useState(null);

    useEffect(() => {
        socket.on('transaction-update', (data) => {
            console.log('Transaction update received:', data);
            transactionService.createNewTransaction(data).then(() => {
                setTransaction(data);
                toast.success('Upgrade Premium account successfully!');
                setOpen(false);
                setPayment(false);
                setPayment(null);
            });
        });

        return () => {
            socket.off('transaction-update');
        };
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ fontSize: 16 }}>
                        Upgrade TaskFlow Premium
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1 }}>
                        Get unlimited boards, all the views, unlimited automation, and more
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleOpen}>
                        Upgrade
                    </Button>
                </CardActions>
            </Card>
            <Modal open={open} onClose={handleClose} size="large">
                {!payment && (
                    <Box
                        id="pricing"
                        sx={{
                            pt: { xs: 2, sm: 6 },
                            pb: { xs: 4, sm: 8 },
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: { xs: 3, sm: 6 },
                        }}
                    >
                        <Box
                            sx={{
                                width: { sm: '100%', md: '60%' },
                                textAlign: { sm: 'left', md: 'center' },
                            }}
                        >
                            <Typography component="h2" variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
                                Pricing
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                Quickly build an effective pricing table for your potential customers with this layout.{' '}
                                <br />
                                It&apos;s built with default Material UI components with little customization.
                            </Typography>
                        </Box>
                        <Grid
                            container
                            spacing={3}
                            sx={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}
                        >
                            {tiers.map((tier) => (
                                <Grid
                                    size={{ xs: 12, sm: tier.title === 'Enterprise' ? 12 : 6, md: 4 }}
                                    key={tier.title}
                                >
                                    <Card
                                        sx={[
                                            {
                                                p: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 4,
                                            },
                                            tier.title === 'Professional' &&
                                                ((theme) => ({
                                                    border: 'none',
                                                    background:
                                                        'radial-gradient(circle at 50% 0%, hsl(220, 20%, 35%), hsl(220, 30%, 6%))',
                                                    boxShadow: `0 8px 12px hsla(220, 20%, 42%, 0.2)`,
                                                    ...theme.applyStyles('dark', {
                                                        background:
                                                            'radial-gradient(circle at 50% 0%, hsl(220, 20%, 20%), hsl(220, 30%, 16%))',
                                                        boxShadow: `0 8px 12px hsla(0, 0%, 0%, 0.8)`,
                                                    }),
                                                })),
                                        ]}
                                    >
                                        <CardContent>
                                            <Box
                                                sx={[
                                                    {
                                                        mb: 1,
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        gap: 2,
                                                    },
                                                    tier.title === 'Professional'
                                                        ? { color: 'grey.100' }
                                                        : { color: '' },
                                                ]}
                                            >
                                                <Typography component="h3" variant="h6">
                                                    {tier.title}
                                                </Typography>
                                                {tier.title === 'Professional' && (
                                                    <Chip icon={<AutoAwesomeIcon />} label={tier.subheader} />
                                                )}
                                            </Box>
                                            <Box
                                                sx={[
                                                    {
                                                        display: 'flex',
                                                        alignItems: 'baseline',
                                                    },
                                                    tier.title === 'Professional'
                                                        ? { color: 'grey.50' }
                                                        : { color: null },
                                                ]}
                                            >
                                                <Typography component="h3" variant="h2">
                                                    {tier.price}đ
                                                </Typography>
                                                <Typography component="h3" variant="h6">
                                                    &nbsp; per month
                                                </Typography>
                                            </Box>
                                            <Divider sx={{ my: 2, opacity: 0.8, borderColor: 'divider' }} />
                                            {tier.description.map((line) => (
                                                <Box
                                                    key={line}
                                                    sx={{ py: 1, display: 'flex', gap: 1.5, alignItems: 'center' }}
                                                >
                                                    <CheckCircleRoundedIcon
                                                        sx={[
                                                            {
                                                                width: 20,
                                                            },
                                                            tier.title === 'Professional'
                                                                ? { color: 'primary.light' }
                                                                : { color: 'primary.main' },
                                                        ]}
                                                    />
                                                    <Typography
                                                        variant="subtitle2"
                                                        component={'span'}
                                                        sx={[
                                                            tier.title === 'Professional'
                                                                ? { color: 'grey.50' }
                                                                : { color: null },
                                                        ]}
                                                    >
                                                        {line}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                fullWidth
                                                variant={tier.buttonVariant}
                                                color={tier.buttonColor}
                                                onClick={() => {
                                                    setPayment(true);
                                                    setTier(tier);
                                                }}
                                            >
                                                {tier.buttonText}
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {payment && (
                    <Box
                        id="pricing"
                        sx={{
                            pt: { xs: 2, sm: 6 },
                            pb: { xs: 4, sm: 8 },
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: { xs: 3, sm: 6 },
                        }}
                    >
                        <Box
                            sx={{
                                width: { sm: '100%', md: '60%' },
                                textAlign: { sm: 'left', md: 'center' },
                            }}
                        >
                            <Typography component="h2" variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
                                Payment
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                Upgrade to a Premium account to unlock exclusive features and enhanced experiences.{' '}
                                <br />
                                Enjoy unlimited access, priority support, and many more benefits designed just for you.
                            </Typography>
                        </Box>
                        {!transaction && <Typography>Waiting for transaction...</Typography>}
                        <Grid
                            container
                            spacing={3}
                            sx={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}
                        >
                            <img
                                src={`https://qr.sepay.vn/img?acc=0975882405&bank=MBBank&amount=${tier?.price}&des=Dang%20ky%20tai%20khoan%20Pro`}
                                alt=""
                            />
                        </Grid>
                    </Box>
                )}
            </Modal>
        </Box>
    );
}

export default Pricing;
