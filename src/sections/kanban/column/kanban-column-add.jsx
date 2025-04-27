import { useState, useCallback, useMemo } from 'react';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { inputBaseClasses } from '@mui/material/InputBase';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { useBoolean } from '~/hooks/use-boolean';

import { Iconify } from '~/components/iconify';
import { createNewColumn } from '~/store/actions/kanbanAction';

export function KanbanColumnAdd({ sx, board, ...other }) {
    const dispatch = useDispatch();
    const [columnTitle, setColumnTitle] = useState('');

    const openAddColumn = useBoolean();

    const handleChangeName = useCallback((event) => {
        setColumnTitle(event.target.value);
    }, []);

    const handleCreateColumn = useCallback(async () => {
        const columnData = { title: columnTitle.trim() ? columnTitle : 'Untitled', boardId: board?.id };

        dispatch(createNewColumn(columnData));

        setColumnTitle('');
        openAddColumn.onFalse();
    }, [board, columnTitle, dispatch, openAddColumn]);

    const debouncedHandleCreateColumn = useMemo(
        () =>
            debounce((event) => {
                if (event.key === 'Enter') {
                    handleCreateColumn();
                }
            }, 500),
        [handleCreateColumn],
    );

    const handleKeyUpCreateColumn = useCallback(
        (event) => {
            debouncedHandleCreateColumn(event);
        },
        [debouncedHandleCreateColumn],
    );

    const handleCancel = useCallback(() => {
        setColumnTitle('');
        openAddColumn.onFalse();
    }, [openAddColumn]);

    return (
        <>
            <Box sx={{ width: 'var(--column-width)', flex: '0 0 auto', ...sx }} {...other}>
                {openAddColumn.value ? (
                    <ClickAwayListener onClickAway={handleCancel}>
                        <TextField
                            autoFocus
                            fullWidth
                            placeholder="Untitled"
                            value={columnTitle}
                            onChange={handleChangeName}
                            onKeyUp={handleKeyUpCreateColumn}
                            helperText="Press Enter to create the column."
                            sx={{ [`& .${inputBaseClasses.input}`]: { typography: 'h6' } }}
                        />
                    </ClickAwayListener>
                ) : (
                    <Button
                        fullWidth
                        size="large"
                        color="inherit"
                        variant="outlined"
                        startIcon={<Iconify icon="mingcute:add-line" sx={{ mr: -0.5 }} />}
                        onClick={openAddColumn.onTrue}
                    >
                        Add column
                    </Button>
                )}
            </Box>

            <Box sx={{ width: '1px', flexShrink: 0 }} />
        </>
    );
}
