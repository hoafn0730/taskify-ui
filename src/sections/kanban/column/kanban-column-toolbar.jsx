import { useRef, useState, useEffect, useCallback, memo } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from '~/hooks/use-boolean';

import { varAlpha } from '~/theme/styles';

import { Label } from '~/components/label';
import { Iconify } from '~/components/iconify';
import { ConfirmDialog } from '~/components/custom-dialog';
import { usePopover, CustomPopover } from '~/components/custom-popover';

import KanbanInputName from '../components/kanban-input-name';

function KanbanColumnToolBar({
    columnTitle,
    totalTasks,
    handleProps,
    onClearColumn,
    onToggleAddTask,
    onDeleteColumn,
    onUpdateColumn,
}) {
    const renameRef = useRef(null);

    const popover = usePopover();

    const confirmDialog = useBoolean();

    const [name, setName] = useState(columnTitle);

    useEffect(() => {
        if (popover.open) {
            if (renameRef.current) {
                renameRef.current.focus();
            }
        }
    }, [popover.open]);

    const handleChangeName = useCallback((event) => {
        setName(event.target.value);
    }, []);

    const handleKeyUpUpdateColumn = useCallback(
        (event) => {
            if (event.key === 'Enter') {
                if (renameRef.current) {
                    renameRef.current.blur();
                }
                onUpdateColumn?.(name);
            }
        },
        [name, onUpdateColumn],
    );

    return (
        <>
            <Stack direction="row" alignItems="center">
                <KanbanInputName
                    inputRef={renameRef}
                    placeholder="Column name"
                    value={name}
                    onChange={handleChangeName}
                    onKeyUp={handleKeyUpUpdateColumn}
                    inputProps={{ id: `input-column-${name}` }}
                    sx={{ mx: 1 }}
                />

                <Label
                    sx={{
                        borderRadius: '50%',
                        borderColor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.24),
                    }}
                >
                    {totalTasks}
                </Label>

                <IconButton size="small" color="inherit" onClick={onToggleAddTask}>
                    <Iconify icon="solar:add-circle-bold" />
                </IconButton>

                <IconButton size="small" color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
                    <Iconify icon="solar:menu-dots-bold-duotone" />
                </IconButton>

                <IconButton size="small" {...handleProps}>
                    <Iconify icon="nimbus:drag-dots" />
                </IconButton>
            </Stack>

            <CustomPopover open={popover.open} anchorEl={popover.anchorEl} onClose={popover.onClose}>
                <MenuList>
                    <MenuItem onClick={popover.onClose}>
                        <Iconify icon="solar:pen-bold" />
                        Rename
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            onClearColumn?.();
                            popover.onClose();
                        }}
                    >
                        <Iconify icon="solar:eraser-bold" />
                        Clear
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            confirmDialog.onTrue();
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
                open={confirmDialog.value}
                onClose={confirmDialog.onFalse}
                title="Delete"
                content={
                    <>
                        Are you sure want to delete column?
                        <Box sx={{ typography: 'caption', color: 'error.main', mt: 2 }}>
                            <strong> NOTE: </strong> All tasks related to this category will also be deleted.
                        </Box>
                    </>
                }
                action={
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            onDeleteColumn?.();
                            confirmDialog.onFalse();
                        }}
                    >
                        Delete
                    </Button>
                }
            />
        </>
    );
}

export default memo(KanbanColumnToolBar);
