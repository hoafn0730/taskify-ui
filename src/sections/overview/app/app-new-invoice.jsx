import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';

import { fCurrency } from '~/utils/format-number';

import { Label } from '~/components/label';
import { Iconify } from '~/components/iconify';
import { Scrollbar } from '~/components/scrollbar';
import { TableHeadCustom } from '~/components/table';
import { usePopover, CustomPopover } from '~/components/custom-popover';

// ----------------------------------------------------------------------

export function AppNewInvoice({ title, subheader, tableData, headLabel, ...other }) {
    return (
        <Card {...other}>
            <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

            <Scrollbar sx={{ minHeight: 402 }}>
                <Table sx={{ minWidth: 680 }}>
                    <TableHeadCustom headLabel={headLabel} />

                    <TableBody>
                        {tableData.map((row) => (
                            <RowItem key={row.id} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </Scrollbar>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Box sx={{ p: 2, textAlign: 'right' }}>
                <Button
                    size="small"
                    color="inherit"
                    endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
                >
                    View all
                </Button>
            </Box>
        </Card>
    );
}

function RowItem({ row }) {
    const popover = usePopover();

    const handleDownload = () => {
        popover.onClose();
        console.info('DOWNLOAD', row.id);
    };

    const handlePrint = () => {
        popover.onClose();
        console.info('PRINT', row.id);
    };

    const handleShare = () => {
        popover.onClose();
        console.info('SHARE', row.id);
    };

    const handleDelete = () => {
        popover.onClose();
        console.info('DELETE', row.id);
    };

    return (
        <>
            <TableRow>
                <TableCell>{row.code}</TableCell>

                <TableCell>{row?.category || 'Hoàn Trần'}</TableCell>

                <TableCell>{fCurrency(row.amount)}</TableCell>

                <TableCell>
                    <Label
                        variant="soft"
                        color={
                            (row.status === 'progress' && 'warning') ||
                            (row.status === 'out of date' && 'error') ||
                            'success'
                        }
                    >
                        {row.status}
                    </Label>
                </TableCell>

                <TableCell align="right" sx={{ pr: 1 }}>
                    <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell>
            </TableRow>

            <CustomPopover
                open={popover.open}
                anchorEl={popover.anchorEl}
                onClose={popover.onClose}
                slotProps={{ arrow: { placement: 'right-top' } }}
            >
                <MenuList>
                    <MenuItem onClick={handleDownload}>
                        <Iconify icon="eva:cloud-download-fill" />
                        Download
                    </MenuItem>

                    <MenuItem onClick={handlePrint}>
                        <Iconify icon="solar:printer-minimalistic-bold" />
                        Print
                    </MenuItem>

                    <MenuItem onClick={handleShare}>
                        <Iconify icon="solar:share-bold" />
                        Share
                    </MenuItem>

                    <Divider sx={{ borderStyle: 'dashed' }} />

                    <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                        <Iconify icon="solar:trash-bin-trash-bold" />
                        Delete
                    </MenuItem>
                </MenuList>
            </CustomPopover>
        </>
    );
}
