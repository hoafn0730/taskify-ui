import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

import { RouterLink } from '~/components/router-link';
import { Image } from '~/components/image';
import { Iconify } from '~/components/iconify';
import { usePopover, CustomPopover } from '~/components/custom-popover';

import { paths } from '~/configs/paths';

import { fDateTime } from '~/utils/format-time';

export function KanbanItem({ board, onView, onEdit, onDelete, onStar }) {
    const popover = usePopover();
    const [isStarred, setIsStarred] = useState(!!board.star);

    const buttonStar = (
        <Button
            className="star-button"
            sx={{
                top: 8,
                right: 8,
                zIndex: 9,
                borderRadius: 1,
                position: 'absolute',
                typography: 'subtitle2',
                p: 0.5,
                minWidth: 'auto',
                opacity: 0,
                transition: 'opacity 0.3s ease',
            }}
            onClick={() => setIsStarred((prev) => !prev)}
        >
            {isStarred ? (
                <Iconify icon="eva:star-fill" sx={{ color: 'warning.main' }} />
            ) : (
                <Iconify icon="eva:star-outline" sx={{ color: 'warning.main' }} />
            )}
        </Button>
    );

    const renderImages = (
        <Box gap={0.5} display="flex" sx={{ p: 1 }}>
            <Box flexGrow={1} sx={{ position: 'relative' }}>
                {buttonStar}
                <Image alt={board.images[0]} src={board.images[0]} sx={{ width: 1, height: 164, borderRadius: 1 }} />
            </Box>
        </Box>
    );

    const renderTexts = (
        <ListItemText
            sx={{ p: (theme) => theme.spacing(1, 2.5, 2, 2.5) }}
            primary={
                <Link component={RouterLink} href={paths.dashboard.kanban.details(board.id)} color="inherit">
                    {board.name}
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
