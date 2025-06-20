import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from '~/hooks/use-boolean';

import { fCurrency } from '~/utils/format-number';
import { fDate, fTime } from '~/utils/format-time';

import { Label } from '~/components/label';
import { Iconify } from '~/components/iconify';
import { ConfirmDialog } from '~/components/custom-dialog';
import { usePopover, CustomPopover } from '~/components/custom-popover';

// ----------------------------------------------------------------------

export function InvoiceTableRow({ row, selected, onSelectRow, onViewRow, onEditRow, onDeleteRow }) {
    const confirm = useBoolean();

    const popover = usePopover();

    return (
        <>
            <TableRow hover selected={selected}>
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={selected}
                        onClick={onSelectRow}
                        inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
                    />
                </TableCell>

                <TableCell>
                    <Stack spacing={2} direction="row" alignItems="center">
                        <Avatar alt={'Hoàn Trần'}>{'Hoàn Trần'.charAt(0).toUpperCase()}</Avatar>

                        <ListItemText
                            disableTypography
                            primary={
                                <Typography variant="body2" noWrap>
                                    {/* {row.invoiceTo.name}  */}
                                    Hoàn Trần
                                </Typography>
                            }
                            secondary={
                                <Link
                                    noWrap
                                    variant="body2"
                                    onClick={onViewRow}
                                    sx={{ color: 'text.disabled', cursor: 'pointer' }}
                                >
                                    {row.code}
                                </Link>
                            }
                        />
                    </Stack>
                </TableCell>

                <TableCell>
                    <ListItemText
                        primary={fDate(row.createdAt)}
                        secondary={fTime(row.createdAt)}
                        primaryTypographyProps={{ typography: 'body2', noWrap: true }}
                        secondaryTypographyProps={{ mt: 0.5, component: 'span', typography: 'caption' }}
                    />
                </TableCell>

                <TableCell>
                    <ListItemText
                        primary={fDate(row.dueDate)} //row.dueDate
                        secondary={fTime(row.dueDate)}
                        primaryTypographyProps={{ typography: 'body2', noWrap: true }}
                        secondaryTypographyProps={{ mt: 0.5, component: 'span', typography: 'caption' }}
                    />
                </TableCell>

                <TableCell>
                    {fCurrency(
                        149000,
                        // row.totalAmount
                    )}
                </TableCell>

                <TableCell align="center">{row.sent}</TableCell>

                <TableCell>
                    <Label
                        variant="soft"
                        color={
                            (row.status === 'paid' && 'success') ||
                            (row.status === 'pending' && 'warning') ||
                            (row.status === 'overdue' && 'error') ||
                            'default'
                        }
                    >
                        {row.status}
                    </Label>
                </TableCell>

                <TableCell align="right" sx={{ px: 1 }}>
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
                    <MenuItem
                        onClick={() => {
                            onViewRow();
                            popover.onClose();
                        }}
                    >
                        <Iconify icon="solar:eye-bold" />
                        View
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            onEditRow();
                            popover.onClose();
                        }}
                    >
                        <Iconify icon="solar:pen-bold" />
                        Edit
                    </MenuItem>

                    <Divider sx={{ borderStyle: 'dashed' }} />

                    <MenuItem
                        onClick={() => {
                            confirm.onTrue();
                            popover.onClose();
                        }}
                        sx={{ color: 'error.main' }}
                    >
                        <Iconify icon="solar:trash-bin-trash-bold" />
                        Delete
                    </MenuItem>
                </MenuList>
            </CustomPopover>

            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                title="Delete"
                content="Are you sure want to delete?"
                action={
                    <Button variant="contained" color="error" onClick={onDeleteRow}>
                        Delete
                    </Button>
                }
            />
        </>
    );
}
