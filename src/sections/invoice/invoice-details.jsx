import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { fDate } from '~/utils/format-time';
import { fCurrency } from '~/utils/format-number';

import { INVOICE_STATUS_OPTIONS } from '~/_mock';

import { Label } from '~/components/label';
import { Scrollbar } from '~/components/scrollbar';

import { InvoiceToolbar } from './invoice-toolbar';

// ----------------------------------------------------------------------

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    [`& .${tableCellClasses.root}`]: {
        textAlign: 'right',
        borderBottom: 'none',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}));

// ----------------------------------------------------------------------

export function InvoiceDetails({ invoice }) {
    const [currentStatus, setCurrentStatus] = useState(invoice?.status);

    const handleChangeStatus = useCallback((event) => {
        setCurrentStatus(event.target.value);
    }, []);

    const renderTotal = (
        <>
            <StyledTableRow>
                <TableCell colSpan={3} />
                <TableCell sx={{ color: 'text.secondary' }}>
                    <Box sx={{ mt: 2 }} />
                    Subtotal
                </TableCell>
                <TableCell width={120} sx={{ typography: 'subtitle2' }}>
                    <Box sx={{ mt: 2 }} />
                    {fCurrency(invoice?.amount || 149000)}
                </TableCell>
            </StyledTableRow>

            {/* <StyledTableRow>
                <TableCell colSpan={3} />
                <TableCell sx={{ color: 'text.secondary' }}>Shipping</TableCell>
                <TableCell width={120} sx={{ color: 'error.main', typography: 'body2' }}>
                    - {fCurrency(invoice?.shipping)}
                </TableCell>
            </StyledTableRow> */}

            {/* <StyledTableRow>
                <TableCell colSpan={3} />
                <TableCell sx={{ color: 'text.secondary' }}>Discount</TableCell>
                <TableCell width={120} sx={{ color: 'error.main', typography: 'body2' }}>
                    - {fCurrency(invoice?.discount) }|
                </TableCell>
            </StyledTableRow> */}

            {/* <StyledTableRow>
                <TableCell colSpan={3} />
                <TableCell sx={{ color: 'text.secondary' }}>Taxes</TableCell>
                <TableCell width={120}>{fCurrency(invoice?.taxes)}</TableCell>
            </StyledTableRow> */}

            <StyledTableRow>
                <TableCell colSpan={3} />
                <TableCell sx={{ typography: 'subtitle1' }}>Total</TableCell>
                <TableCell width={140} sx={{ typography: 'subtitle1' }}>
                    {fCurrency(invoice?.amount)}
                </TableCell>
            </StyledTableRow>
        </>
    );

    const renderFooter = (
        <Box gap={2} display="flex" alignItems="center" flexWrap="wrap" sx={{ py: 3 }}>
            <div>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    NOTES
                </Typography>
                <Typography variant="body2">
                    We appreciate your business. Should you need us to add VAT or extra notes let us know!
                </Typography>
            </div>

            <Box flexGrow={{ md: 1 }} sx={{ textAlign: { md: 'right' } }}>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Have a question?
                </Typography>
                <Typography variant="body2">support@taskify.cc</Typography>
            </Box>
        </Box>
    );

    const renderList = (
        <Scrollbar sx={{ mt: 5 }}>
            <Table sx={{ minWidth: 960 }}>
                <TableHead>
                    <TableRow>
                        <TableCell width={40}>#</TableCell>

                        <TableCell sx={{ typography: 'subtitle2' }}>Description</TableCell>

                        <TableCell>Qty</TableCell>

                        <TableCell align="right">Unit price</TableCell>

                        <TableCell align="right">Total</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    <TableRow>
                        <TableCell>{1}</TableCell>

                        <TableCell>
                            <Box sx={{ maxWidth: 560 }}>
                                <Typography variant="subtitle2">{invoice?.code}</Typography>

                                {/* <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                    {invoice?.code}
                                </Typography> */}
                            </Box>
                        </TableCell>

                        <TableCell>{invoice?.quantity || 1}</TableCell>

                        <TableCell align="right">{fCurrency(invoice?.amount)}</TableCell>

                        <TableCell align="right">{fCurrency(invoice?.amount)}</TableCell>
                    </TableRow>

                    {renderTotal}
                </TableBody>
            </Table>
        </Scrollbar>
    );

    return (
        <>
            <InvoiceToolbar
                invoice={invoice}
                currentStatus={currentStatus || invoice?.status}
                onChangeStatus={handleChangeStatus}
                statusOptions={INVOICE_STATUS_OPTIONS}
            />

            <Card sx={{ pt: 5, px: 5 }}>
                <Box
                    rowGap={5}
                    display="grid"
                    alignItems="center"
                    gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
                >
                    <Box component="img" alt="logo" src="/logo/logo-single.svg" sx={{ width: 48, height: 48 }} />

                    <Stack spacing={1} alignItems={{ xs: 'flex-start', md: 'flex-end' }}>
                        <Label
                            variant="soft"
                            color={
                                (currentStatus === 'paid' && 'success') ||
                                (currentStatus === 'pending' && 'warning') ||
                                (currentStatus === 'overdue' && 'error') ||
                                'default'
                            }
                        >
                            {currentStatus}
                        </Label>

                        <Typography variant="h6">{invoice?.invoiceNumber}</Typography>
                    </Stack>

                    <Stack sx={{ typography: 'body2' }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            Invoice from
                        </Typography>
                        {invoice?.invoiceFrom?.name || 'Taskify'}
                        {/* <br />
                        {invoice?.invoiceFrom.fullAddress}
                        <br />
                        Phone: {invoice?.invoiceFrom.phoneNumber}
                        <br /> */}
                    </Stack>

                    <Stack sx={{ typography: 'body2' }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            Invoice to
                        </Typography>
                        {invoice?.invoiceTo?.name || 'Hoàn Trần'}
                        {/* <br />
                        {invoice?.invoiceTo.fullAddress}
                        <br />
                        Phone: {invoice?.invoiceTo.phoneNumber}
                        <br /> */}
                    </Stack>

                    <Stack sx={{ typography: 'body2' }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            Date create
                        </Typography>
                        {fDate(invoice?.createdAt)}
                    </Stack>

                    <Stack sx={{ typography: 'body2' }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            Due date
                        </Typography>
                        {fDate(invoice?.dueDate)}
                    </Stack>
                </Box>

                {renderList}

                <Divider sx={{ mt: 5, borderStyle: 'dashed' }} />

                {renderFooter}
            </Card>
        </>
    );
}
