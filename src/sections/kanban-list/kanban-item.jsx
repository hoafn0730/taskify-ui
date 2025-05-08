import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import { RouterLink } from '~/components/router-link';
import { Image } from '~/components/image';
import { Iconify } from '~/components/iconify';
import { usePopover, CustomPopover } from '~/components/custom-popover';

import { paths } from '~/configs/paths';

import { fDateTime } from '~/utils/format-time';
import { useBoolean } from '~/hooks/use-boolean';

export function KanbanItem({ board, onView, onEdit, onDelete, onStarToggle }) {
    const popover = usePopover();
    const favorite = useBoolean(!!board.star);

    const buttonStar = (
        <Checkbox
            className="star-button"
            color="warning"
            icon={<Iconify icon="eva:star-outline" />}
            checkedIcon={<Iconify icon="eva:star-fill" />}
            checked={favorite.value}
            onChange={() => {
                onStarToggle(board.id, favorite.value);
                favorite.onToggle();
            }}
            sx={{
                p: 0.75,
                top: 8,
                right: 8,
                zIndex: 9,
                position: 'absolute',
                opacity: 0,
                transition: 'opacity 0.3s ease',
            }}
        />
    );

    // [ ] TODO: update image kanban
    const renderImages = (
        <Box gap={0.5} display="flex" sx={{ p: 1 }}>
            <Box flexGrow={1} sx={{ position: 'relative' }}>
                {buttonStar}
                <Image alt={board?.image} src={board?.image} sx={{ width: 1, height: 164, borderRadius: 1 }} />
            </Box>
        </Box>
    );

    const renderTexts = (
        <ListItemText
            sx={{ p: (theme) => theme.spacing(1, 2.5, 2, 2.5) }}
            primary={
                <Link component={RouterLink} href={paths.dashboard.kanban.details(board.slug)} color="inherit">
                    {board.title}
                </Link>
            }
            secondary={`Created At: ${fDateTime(board.createdAt)}`}
            primaryTypographyProps={{
                noWrap: true,
                component: 'span',
                color: 'text.primary',
                typography: 'subtitle1',
            }}
            secondaryTypographyProps={{
                typography: 'caption',
                color: 'text.disabled',
                mt: 1,
            }}
        />
    );

    return (
        <>
            <Card
                sx={{
                    '&:hover .star-button': {
                        opacity: 1,
                    },
                    '.star-button.Mui-checked': {
                        opacity: 1,
                    },
                }}
            >
                {renderImages}

                <Box sx={{ position: 'relative' }}>
                    {renderTexts}
                    <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', bottom: 8, right: 8 }}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </Box>
            </Card>

            <CustomPopover open={popover.open} anchorEl={popover.anchorEl} onClose={popover.onClose}>
                <MenuList>
                    <MenuItem
                        onClick={() => {
                            popover.onClose();
                            onView();
                        }}
                    >
                        <Iconify icon="solar:eye-bold" />
                        View
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            popover.onClose();
                            onEdit();
                        }}
                    >
                        <Iconify icon="solar:pen-bold" />
                        Edit
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            popover.onClose();
                            onDelete();
                        }}
                        sx={{ color: 'error.main' }}
                    >
                        <Iconify icon="solar:trash-bin-trash-bold" />
                        Delete
                    </MenuItem>
                </MenuList>
            </CustomPopover>
        </>
    );
}
