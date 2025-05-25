import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from '~/hooks/use-boolean';

import { fDate } from '~/utils/format-time';
import { fCurrency } from '~/utils/format-number';

import { Iconify } from '~/components/iconify';

export function AccountBillingHistory({ invoices }) {
    const showMore = useBoolean();

    return (
        <Card>
            <CardHeader title="Invoice history" />

            <Stack spacing={1.5} sx={{ px: 3, pt: 3 }}>
                {(showMore.value ? invoices : invoices.slice(0, 8)).map((invoice) => (
                    <Stack key={invoice.id} direction="row" alignItems="center">
                        <ListItemText
                            primary={invoice.code}
                            secondary={fDate(invoice.createdAt)}
                            primaryTypographyProps={{ typography: 'body2' }}
                            secondaryTypographyProps={{
                                mt: 0.5,
                                component: 'span',
                                typography: 'caption',
                                color: 'text.disabled',
                            }}
                        />

                        <Typography variant="body2" sx={{ textAlign: 'right', mr: 5 }}>
                            {fCurrency(invoice.amount)}
                        </Typography>
                    </Stack>
                ))}

                <Divider sx={{ borderStyle: 'dashed' }} />
            </Stack>

            {invoices?.length > 8 && (
                <Stack alignItems="flex-start" sx={{ p: 2 }}>
                    <Button
                        size="small"
                        color="inherit"
                        startIcon={
                            <Iconify
                                width={16}
                                icon={showMore.value ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
                                sx={{ mr: -0.5 }}
                            />
                        }
                        onClick={showMore.onToggle}
                    >
                        Show {showMore.value ? `less` : `more`}
                    </Button>
                </Stack>
            )}
        </Card>
    );
}
