import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { kanbanService } from '~/services/kanbanService';
import { updateBoardData } from '~/store/slices/kanbanSlice';
import { cloneDeep } from 'lodash';

export function KanbanDetailsToolbar({ liked, onLike, taskName, onDelete, task, onCloseDetails }) {
    const dispatch = useDispatch();
    const { activeBoard: board } = useSelector((state) => state.kanban);
    const smUp = useResponsive('up', 'sm');

    const dialog = useBoolean();

    const confirm = useBoolean();

    const popover = usePopover();

    const menuPopover = usePopover();

    const [listId, setListId] = useState(task.columnId);

    const handleChangeList = useCallback(
        (newValue) => {
            popover.onClose();
            setListId(newValue);
        },
        [popover],
    );

    const handleAddChecklist = async (data) => {
        const res = await kanbanService.createChecklist({
            cardId: task.id,
            title: data.title,
            copyFrom: +data.copyFrom,
        });

        // Cập nhật task trong board
        const newBoard = cloneDeep(board);
        const column = newBoard.columns.find((col) => col.id === task.columnId);

        const tasksInColumn = newBoard.tasks[column.uuid] || [];

        const taskIndex = tasksInColumn.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) {
            tasksInColumn[taskIndex] = {
                ...task,
                checklists: [...task.checklists, res],
            };
            newBoard.tasks[column.uuid] = tasksInColumn;
            dispatch(updateBoardData(newBoard));
            dialog.onFalse();
        }
    };

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

                    <IconButton onClick={menuPopover.onOpen}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </Stack>
            </Stack>

            <CustomPopover
                open={menuPopover.open}
                anchorEl={menuPopover.anchorEl}
                onClose={menuPopover.onClose}
                slotProps={{ arrow: { placement: 'top-right' } }}
            >
                <MenuList>
                    <MenuItem
                        onClick={() => {
                            dialog.onTrue();
                            menuPopover.onClose();
                        }}
                    >
                        Checklist
                    </MenuItem>
                </MenuList>
            </CustomPopover>

            <AddChecklistDialog
                open={dialog.value}
                onClose={dialog.onFalse}
                onAdd={handleAddChecklist}
                checklistOptions={task?.checklists || []}
            />

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

export function AddChecklistDialog({ open, onClose, onAdd, checklistOptions = [] }) {
    const [title, setTitle] = useState('Checklist');
    const [copyFrom, setCopyFrom] = useState('');

    const handleSubmit = () => {
        onAdd({ title, copyFrom });
        setTitle('Checklist');
        setCopyFrom('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add checklist</DialogTitle>

            <DialogContent>
                <Typography sx={{ mb: 2 }}>
                    Set checklist title and optionally copy items from existing checklist.
                </Typography>

                <TextField
                    autoFocus
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <TextField
                    select
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    label="Copy items from..."
                    value={copyFrom}
                    onChange={(e) => setCopyFrom(e.target.value)}
                    sx={{ mt: 2 }}
                >
                    <MenuItem value="">(none)</MenuItem>
                    {checklistOptions.map((opt) => (
                        <MenuItem key={opt.id} value={opt.id}>
                            {opt.title}
                        </MenuItem>
                    ))}
                </TextField>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} variant="outlined" color="inherit">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}
