import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from '~/hooks/use-boolean';
import { useResponsive } from '~/hooks/use-responsive';

import { Iconify } from '~/components/iconify';
import { ConfirmDialog } from '~/components/custom-dialog';
import { usePopover, CustomPopover } from '~/components/custom-popover';

export function KanbanDetailsToolbar({ liked, onLike, taskName, onDelete, task, onCloseDetails }) {
    const { activeBoard: board } = useSelector((state) => state.kanban);
    const smUp = useResponsive('up', 'sm');

    const confirm = useBoolean();

    const popover = usePopover();

    const [listId, setListId] = useState(task.columnId);

    const handleChangeList = useCallback(
        (newValue) => {
            popover.onClose();
            setListId(newValue);
        },
        [popover],
    );

    return (
        <>
            <Stack
                direction="row"
                alignItems="center"
                sx={{
                    p: (theme) => theme.spacing(2.5, 1, 2.5, 2.5),
                    borderBottom: (theme) => `solid 1px ${theme.vars.palette.divider}`,
                }}
            >
                {!smUp && (
                    <Tooltip title="Back">
                        <IconButton onClick={onCloseDetails} sx={{ mr: 1 }}>
                            <Iconify icon="eva:arrow-ios-back-fill" />
                        </IconButton>
                    </Tooltip>
                )}

                <Button
                    size="small"
                    variant="soft"
                    endIcon={<Iconify icon="eva:arrow-ios-downward-fill" width={16} sx={{ ml: -0.5 }} />}
                    onClick={popover.onOpen}
                >
                    {board?.columns?.find((col) => col.id === listId).title}
                </Button>

                <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
                    <Tooltip title="Like">
                        <IconButton color={liked ? 'default' : 'primary'} onClick={onLike}>
                            <Iconify icon="ic:round-thumb-up" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete task">
                        <IconButton onClick={confirm.onTrue}>
                            <Iconify icon="solar:trash-bin-trash-bold" />
                        </IconButton>
                    </Tooltip>

                    {/* [ ] more btn*/}
                    {/* <IconButton>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton> */}
                </Stack>
            </Stack>

            <CustomPopover
                open={popover.open}
                anchorEl={popover.anchorEl}
                onClose={popover.onClose}
                slotProps={{ arrow: { placement: 'top-right' } }}
            >
                <MenuList>
                    {!!board?.columns?.length &&
                        board?.columns?.map((option) => (
                            <MenuItem
                                key={option.id}
                                selected={listId === option.id}
                                onClick={() => {
                                    handleChangeList(option.id);
                                }}
                            >
                                {option.title}
                            </MenuItem>
                        ))}
                </MenuList>
            </CustomPopover>

            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                title="Delete"
                content={
                    <>
                        Are you sure want to delete <strong> {taskName} </strong>?
                    </>
                }
                action={
                    <Button variant="contained" color="error" onClick={onDelete}>
                        Delete
                    </Button>
                }
            />
        </>
    );
}
