import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from '~/hooks/use-boolean';

import { Label } from '~/components/label';
import { Iconify } from '~/components/iconify';
import { ConfirmDialog } from '~/components/custom-dialog';
import { usePopover } from '~/components/custom-popover';

import { MemberQuickEditForm } from './member-quick-edit-form';
import { capitalizeFirstLetter } from '~/utils/formatters';

export function MemberTableRow({ row, selected, onSelectRow, onDeleteRow }) {
    const confirm = useBoolean();

    const popover = usePopover();

    const quickEdit = useBoolean();

    return (
        <>
            <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
                <TableCell padding="checkbox">
                    <Checkbox id={row.id} checked={selected} onClick={onSelectRow} />
                </TableCell>

                <TableCell>
                    <Stack spacing={2} direction="row" alignItems="center">
                        <Avatar alt={row.displayName} src={row.avatar} />

                        <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
                            <Link color="inherit" onClick={quickEdit.onTrue} sx={{ cursor: 'pointer' }}>
                                {row.displayName}
                            </Link>
                        </Stack>
                    </Stack>
                </TableCell>

                <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.email}</TableCell>

                <TableCell sx={{ whiteSpace: 'nowrap' }}>{capitalizeFirstLetter(row.role)}</TableCell>

                <TableCell>
                    <Label variant="soft" color={(row.active && 'success') || (!row.active && 'warning') || 'default'}>
                        {row.active ? 'Active' : 'Inactive'}
                    </Label>
                </TableCell>

                <TableCell>
                    <Stack direction="row" alignItems="center">
                        <Tooltip title="Quick Edit" placement="top" arrow>
                            <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
                                <Iconify icon="solar:pen-bold" />
                            </IconButton>
                        </Tooltip>

                        <IconButton
                            color={popover.open ? 'inherit' : 'default'}
                            onClick={confirm.onTrue}
                            sx={{ color: 'error.main' }}
                        >
                            <Iconify icon="solar:trash-bin-trash-bold" />
                        </IconButton>
                    </Stack>
                </TableCell>
            </TableRow>

            <MemberQuickEditForm currentMember={row} open={quickEdit.value} onClose={quickEdit.onFalse} />

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
