import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { Label } from '~/components/label';
import { Iconify } from '~/components/iconify';
import { usePopover, CustomPopover } from '~/components/custom-popover';

import { fDate, fTime } from '~/utils/format-time';
import { useGetList } from '~/actions/list';
import { kanbanService } from '~/services/kanbanService';

export function ListTableRow({ row, selected, onViewRow, onSelectRow }) {
    const popover = usePopover();
    const { mutateList, list } = useGetList();

    const renderPrimary = (
        <TableRow hover selected={selected}>
            <TableCell padding="checkbox">
                <Checkbox
                    checked={selected}
                    onClick={onSelectRow}
                    inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
                />
            </TableCell>
            <TableCell>
                <Link
                    color="inherit"
                    //  onClick={onViewRow}
                    underline="always"
                    sx={{ cursor: 'pointer' }}
                >
                    {row.cardCode}
                </Link>
            </TableCell>
            <TableCell>
                <Stack spacing={2} direction="row" alignItems="center">
                    {/* <Avatar alt={row.title} src={row.customer.avatarUrl} /> */}

                    <Stack
                        sx={{
                            typography: 'body2',
                            flex: '1 1 auto',
                            alignItems: 'flex-start',
                        }}
                    >
                        <Box component="span">{row.title}</Box>
                        {/* <Box component="span" sx={{ color: 'text.disabled' }}>
                            {row.customer.email}
                        </Box> */}
                    </Stack>
                </Stack>
            </TableCell>
            <TableCell>
                <Link color="inherit" onClick={onViewRow} underline="always" sx={{ cursor: 'pointer' }}>
                    {row.board.boardCode}
                </Link>
            </TableCell>
            <TableCell>
                <ListItemText
                    primary={fDate(row.dueDate)}
                    secondary={fTime(row.dueDate)}
                    primaryTypographyProps={{ typography: 'body2', noWrap: true }}
                    secondaryTypographyProps={{
                        mt: 0.5,
                        component: 'span',
                        typography: 'caption',
                    }}
                />
            </TableCell>
            <TableCell align="center">
                <Label
                    variant="soft"
                    color={
                        (row.priority === 'low' && 'info') ||
                        (row.priority === 'medium' && 'warning') ||
                        (row.priority === 'high' && 'error') ||
                        'default'
                    }
                >
                    {row.priority}
                </Label>
            </TableCell>
            <TableCell align="center"> {row.labels} </TableCell>
            <TableCell>
                <ListItemText
                    primary={fDate(row.dueDate)}
                    secondary={fTime(row.dueDate)}
                    primaryTypographyProps={{ typography: 'body2', noWrap: true }}
                    secondaryTypographyProps={{
                        mt: 0.5,
                        component: 'span',
                        typography: 'caption',
                    }}
                />
            </TableCell>
            <TableCell>
                <ListItemText
                    primary={fDate(row.dueDate)}
                    secondary={fTime(row.dueDate)}
                    primaryTypographyProps={{ typography: 'body2', noWrap: true }}
                    secondaryTypographyProps={{
                        mt: 0.5,
                        component: 'span',
                        typography: 'caption',
                    }}
                />
            </TableCell>
            <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
                <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
                    <Iconify icon="eva:more-vertical-fill" />
                </IconButton>
            </TableCell>
        </TableRow>
    );

    const handleComplete = async () => {
        // Gọi API để cập nhật trạng thái complete
        await kanbanService.updateTask(row.id, {
            dueComplete: true,
        });

        // Cập nhật list bằng cách loại bỏ row đã complete
        const updatedList = list.filter((item) => item.id !== row.id);

        // Optimistic update - cập nhật UI ngay lập tức
        mutateList(
            {
                data: {
                    data: updatedList,
                    meta: {}, // Giữ nguyên meta nếu có
                },
            },
            false, // Không revalidate ngay để tránh flicker
        );

        popover.onClose();
    };

    const handleDismiss = async () => {
        // Gọi API để dismiss task (reset due date)
        await kanbanService.updateTask(row.id, {
            dueDate: null,
            dueComplete: false,
            dueReminder: -1,
        });

        // Cập nhật list bằng cách loại bỏ row đã dismiss
        const updatedList = list.filter((item) => item.id !== row.id);

        // Optimistic update
        mutateList(
            {
                data: {
                    data: updatedList,
                    meta: {},
                },
            },
            false,
        );

        popover.onClose();
    };

    // cardService.updateCard(card?.id, {
    //     dueComplete: true,
    // });
    // cardService.updateCard(card?.id, {
    //     dueDate: null,
    //     dueComplete: false,
    //     dueReminder: -1,
    // });

    return (
        <>
            {renderPrimary}

            <CustomPopover
                open={popover.open}
                anchorEl={popover.anchorEl}
                onClose={popover.onClose}
                slotProps={{ arrow: { placement: 'right-top' } }}
            >
                <MenuList>
                    <MenuItem onClick={handleComplete}>
                        <Iconify icon="eva:checkmark-fill" />
                        Complete
                    </MenuItem>

                    <MenuItem onClick={handleDismiss} sx={{ color: 'error.main' }}>
                        <Iconify icon="eva:close-fill" />
                        Dismiss
                    </MenuItem>
                </MenuList>
            </CustomPopover>
        </>
    );
}
