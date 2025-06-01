import { useMemo, useState, useCallback, memo } from 'react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

import Paper from '@mui/material/Paper';
import FormHelperText from '@mui/material/FormHelperText';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import InputBase, { inputBaseClasses } from '@mui/material/InputBase';

import { _mock } from '~/_mock';

function KanbanTaskAdd({ openAddTask, onAddTask, onCloseAddTask }) {
    const [taskName, setTaskName] = useState('');
    const { activeBoard } = useSelector((state) => state.kanban);

    const defaultTask = useMemo(
        () => ({
            title: taskName.trim() ? taskName : 'Untitled',
            priority: 'medium',
            description: '',
            labels: activeBoard.tags,
            dueStart: dayjs().toDate(),
            dueDate: dayjs().add(1, 'day').toDate(),
        }),
        [activeBoard.tags, taskName],
    );

    const handleChangeName = useCallback((event) => {
        setTaskName(event.target.value);
    }, []);

    const handleKeyUpAddTask = useCallback(
        (event) => {
            if (event.key === 'Enter') {
                onAddTask(defaultTask);
                setTaskName('');
            }
        },
        [defaultTask, onAddTask],
    );

    const handleCancel = useCallback(() => {
        setTaskName('');
        onCloseAddTask();
    }, [onCloseAddTask]);

    if (!openAddTask) {
        return null;
    }

    return (
        <ClickAwayListener onClickAway={handleCancel}>
            <div>
                <Paper
                    sx={{
                        borderRadius: 1.5,
                        bgcolor: 'background.default',
                        boxShadow: (theme) => theme.customShadows.z1,
                    }}
                >
                    <InputBase
                        autoFocus
                        fullWidth
                        placeholder="Untitled"
                        value={taskName}
                        onChange={handleChangeName}
                        onKeyUp={handleKeyUpAddTask}
                        sx={{
                            px: 2,
                            height: 56,
                            [`& .${inputBaseClasses.input}`]: { p: 0, typography: 'subtitle2' },
                        }}
                    />
                </Paper>

                <FormHelperText sx={{ mx: 1 }}>Press Enter to create the task.</FormHelperText>
            </div>
        </ClickAwayListener>
    );
}

export default memo(KanbanTaskAdd);
