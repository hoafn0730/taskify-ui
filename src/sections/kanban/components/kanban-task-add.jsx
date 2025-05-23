import { useMemo, useState, useCallback, memo } from 'react';

import Paper from '@mui/material/Paper';
import FormHelperText from '@mui/material/FormHelperText';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import InputBase, { inputBaseClasses } from '@mui/material/InputBase';

import { uuidv4 } from '~/utils/uuidv4';

import { _mock } from '~/_mock';

// ----------------------------------------------------------------------

function KanbanTaskAdd({ status, openAddTask, onAddTask, onCloseAddTask }) {
    const [taskName, setTaskName] = useState('');

    const defaultTask = useMemo(
        () => ({
            id: uuidv4(),
            status,
            title: taskName.trim() ? taskName : 'Untitled',
            priority: 'medium',
            attachments: [],
            labels: [],
            comments: [],
            assignee: [],
            due: [null, null],
            reporter: { id: _mock.id(16), name: _mock.fullName(16), avatarUrl: _mock.image.avatar(16) },
        }),
        [status, taskName],
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
