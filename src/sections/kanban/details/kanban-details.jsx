import dayjs from 'dayjs';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useTabs } from '~/hooks/use-tabs';
import { useBoolean } from '~/hooks/use-boolean';

import { varAlpha } from '~/theme/styles';

import { Iconify } from '~/components/iconify';
import { Scrollbar } from '~/components/scrollbar';
import { CustomTabs } from '~/components/custom-tabs';
import { useDateRangePicker, CustomDateRangePicker } from '~/components/custom-date-range-picker';

import { KanbanDetailsToolbar } from './kanban-details-toolbar';
import KanbanInputName from '../components/kanban-input-name';
import { KanbanDetailsPriority } from './kanban-details-priority';
import { KanbanDetailsAttachments } from './kanban-details-attachments';
import { KanbanDetailsCommentList } from './kanban-details-comment-list';
import { KanbanDetailsCommentInput } from './kanban-details-comment-input';
import { KanbanContactsDialog } from '../components/kanban-contacts-dialog';
import { kanbanService } from '~/services/kanbanService';

import { updateBoardData } from '~/store/slices/kanbanSlice';

const SUBTASKS = [
    'Complete project proposal',
    'Conduct market research',
    'Design user interface mockups',
    'Develop backend api',
    'Implement authentication system',
];

const StyledLabel = styled('span')(({ theme }) => ({
    ...theme.typography.caption,
    width: 100,
    flexShrink: 0,
    color: theme.vars.palette.text.secondary,
    fontWeight: theme.typography.fontWeightSemiBold,
}));

function KanbanDetails({ task, openDetails, onUpdateTask, onDeleteTask, onCloseDetails }) {
    const dispatch = useDispatch();
    const { activeBoard: board } = useSelector((state) => state.kanban);

    const tabs = useTabs('overview');

    const [priority, setPriority] = useState(task?.priority);

    const [taskName, setTaskName] = useState(task?.title);

    const [subtaskCompleted, setSubtaskCompleted] = useState(SUBTASKS.slice(0, 2));

    const like = useBoolean();

    const contacts = useBoolean();

    const saveBtn = useBoolean();

    const [taskDescription, setTaskDescription] = useState(task?.description || '');

    const rangePicker = useDateRangePicker(
        dayjs(task?.dueStart || dayjs()),
        dayjs(task?.dueDate || dayjs().add(1, 'day')),
    );

    const labels = task?.labels?.split(',') || [];

    const handleChangeTaskName = useCallback((event) => {
        setTaskName(event.target.value);
    }, []);

    const handleUpdateTask = useCallback(
        (event) => {
            if (event.key === 'Enter') {
                if (taskName) {
                    onUpdateTask({ ...task, title: taskName });
                }
            }
        },
        [onUpdateTask, task, taskName],
    );

    const handleChangeTaskDescription = useCallback((event) => {
        setTaskDescription(event.target.value);
    }, []);

    const handleChangePriority = useCallback(
        (newValue) => {
            onUpdateTask({ ...task, priority: newValue });
            setPriority(newValue);
        },
        [onUpdateTask, task],
    );

    const handleClickSubtaskComplete = (taskId) => {
        const selected = subtaskCompleted.includes(taskId)
            ? subtaskCompleted.filter((value) => value !== taskId)
            : [...subtaskCompleted, taskId];

        setSubtaskCompleted(selected);
    };

    const handleSaveDescription = useCallback(() => {
        if (taskDescription) {
            onUpdateTask({ ...task, description: taskDescription });
        }
    }, [onUpdateTask, task, taskDescription]);

    const handleToggleAssignee = useCallback(
        async (contact) => {
            if (!contact) return;

            await kanbanService.toggleAssignee(task.id, contact.id);

            const newBoard = cloneDeep(board);
            const column = newBoard.columns.find((col) => col.id === task.columnId);
            if (!column) return;

            const tasksInColumn = newBoard.tasks[column.uuid] || [];

            const updatedTasks = tasksInColumn.map((tk) =>
                tk.id === task.id
                    ? {
                          ...tk,
                          assignees: tk.assignees?.some((u) => u.id === contact.id)
                              ? tk.assignees.filter((u) => u.id !== contact.id)
                              : [...(tk.assignees || []), contact],
                      }
                    : tk,
            );

            newBoard.tasks[column.uuid] = updatedTasks;
            dispatch(updateBoardData(newBoard));
        },
        [board, dispatch, task.columnId, task.id],
    );

    const handleApply = useCallback(async () => {
        onUpdateTask({ ...task, dueStart: rangePicker.startDate, dueDate: rangePicker.endDate });
        rangePicker.onClose();
    }, [onUpdateTask, rangePicker, task]);

    const renderToolbar = (
        <KanbanDetailsToolbar
            liked={like.value}
            taskName={task.title}
            onLike={like.onToggle}
            onDelete={onDeleteTask}
            task={task}
            onCloseDetails={onCloseDetails}
        />
    );

    const renderTabs = (
        <CustomTabs value={tabs.value} onChange={tabs.onChange} variant="fullWidth" slotProps={{ tab: { px: 0 } }}>
            {[
                { value: 'overview', label: 'Overview' },
                { value: 'subTasks', label: 'Subtasks' },
                { value: 'comments', label: `Comments (${task?.comments?.length ?? 0})` },
            ].map((tab) => (
                <Tab key={tab.value} value={tab.value} label={tab.label} />
            ))}
        </CustomTabs>
    );

    const renderTabOverview = (
        <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
            {/* Task name */}
            <KanbanInputName
                placeholder="Task name"
                value={taskName}
                onChange={handleChangeTaskName}
                onKeyUp={handleUpdateTask}
                inputProps={{ id: `input-task-${taskName}` }}
            />

            {/* Reporter */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StyledLabel>Reporter</StyledLabel>
                <Avatar alt={task?.reporter?.[0]?.displayName} src={task?.reporter?.[0]?.avatar} />
            </Box>

            {/* Assignees */}
            <Box sx={{ display: 'flex' }}>
                <StyledLabel sx={{ height: 40, lineHeight: '40px' }}>Assignee</StyledLabel>

                <Box sx={{ gap: 1, display: 'flex', flexWrap: 'wrap' }}>
                    {!!task?.assignees?.length &&
                        task.assignees
                            .filter((as) => as.id !== task?.reporter?.[0]?.id)
                            .map((user) => <Avatar key={user.id} alt={user.displayName} src={user.avatar} />)}

                    <Tooltip title="Add assignee">
                        <IconButton
                            onClick={contacts.onTrue}
                            sx={{
                                bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
                                border: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
                            }}
                        >
                            <Iconify icon="mingcute:add-line" />
                        </IconButton>
                    </Tooltip>

                    <KanbanContactsDialog
                        assignees={task?.assignees}
                        reporter={task?.reporter?.[0]}
                        open={contacts.value}
                        onClose={contacts.onFalse}
                        onToggleAssignee={handleToggleAssignee}
                    />
                </Box>
            </Box>

            {/* Labels */}
            {/* // Add label */}
            <Box sx={{ display: 'flex' }}>
                <StyledLabel sx={{ height: 24, lineHeight: '24px' }}>Labels</StyledLabel>

                {!!labels?.length && (
                    <Box sx={{ gap: 1, display: 'flex', flexWrap: 'wrap' }}>
                        {labels.map((label) => (
                            <Chip key={label} color="info" label={label} size="small" variant="soft" />
                        ))}
                    </Box>
                )}
            </Box>

            {/* Due date */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StyledLabel> Due date </StyledLabel>

                {rangePicker.selected ? (
                    <Button size="small" onClick={rangePicker.onOpen}>
                        {rangePicker.shortLabel}
                    </Button>
                ) : (
                    <Tooltip title="Add due date">
                        <IconButton
                            onClick={rangePicker.onOpen}
                            sx={{
                                bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
                                border: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
                            }}
                        >
                            <Iconify icon="mingcute:add-line" />
                        </IconButton>
                    </Tooltip>
                )}

                <CustomDateRangePicker
                    variant="calendar"
                    title="Choose due date"
                    startDate={rangePicker.startDate}
                    endDate={rangePicker.endDate}
                    onChangeStartDate={rangePicker.onChangeStartDate}
                    onChangeEndDate={rangePicker.onChangeEndDate}
                    open={rangePicker.open}
                    onClose={rangePicker.onClose}
                    selected={rangePicker.selected}
                    error={rangePicker.error}
                    onApply={handleApply}
                />
            </Box>

            {/* Priority */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StyledLabel>Priority</StyledLabel>
                <KanbanDetailsPriority priority={priority} onChangePriority={handleChangePriority} />
            </Box>

            {/* Description */}
            <Box sx={{ display: 'flex' }}>
                <StyledLabel> Description </StyledLabel>
                <Box sx={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        multiline
                        size="small"
                        minRows={4}
                        value={taskDescription}
                        onChange={handleChangeTaskDescription}
                        InputProps={{ sx: { typography: 'body2' } }}
                        onFocus={saveBtn.onTrue}
                        onBlur={() => setTimeout(() => saveBtn.onFalse(), 200)}
                    />

                    {saveBtn.value && (
                        <Button
                            variant="contained"
                            sx={{ mt: 1 }}
                            onClick={handleSaveDescription}
                            disabled={taskDescription === task?.description}
                        >
                            Save
                        </Button>
                    )}
                </Box>
            </Box>

            {/* Attachments */}
            <Box sx={{ display: 'flex' }}>
                <StyledLabel>Attachments</StyledLabel>
                <KanbanDetailsAttachments attachments={task?.attachments} taskId={task.id} />
            </Box>
        </Box>
    );

    const renderTabSubtasks = (
        <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
            <div>
                <Typography variant="body2" sx={{ mb: 1 }}>
                    {subtaskCompleted.length} of {SUBTASKS.length}
                </Typography>

                <LinearProgress variant="determinate" value={(subtaskCompleted.length / SUBTASKS.length) * 100} />
            </div>

            <FormGroup>
                {SUBTASKS.map((taskItem) => (
                    <FormControlLabel
                        key={taskItem}
                        control={
                            <Checkbox disableRipple name={taskItem} checked={subtaskCompleted.includes(taskItem)} />
                        }
                        label={taskItem}
                        onChange={() => handleClickSubtaskComplete(taskItem)}
                    />
                ))}
            </FormGroup>

            <Button
                variant="outlined"
                startIcon={<Iconify icon="mingcute:add-line" />}
                sx={{ alignSelf: 'flex-start' }}
            >
                Subtask
            </Button>
        </Box>
    );

    const renderTabComments = <>{!!task?.comments?.length && <KanbanDetailsCommentList comments={task?.comments} />}</>;

    return (
        <Drawer
            open={openDetails}
            onClose={onCloseDetails}
            anchor="right"
            slotProps={{ backdrop: { invisible: true } }}
            PaperProps={{ sx: { width: { xs: 1, sm: 480 } } }}
        >
            {renderToolbar}

            {renderTabs}

            <Scrollbar fillContent sx={{ py: 3, px: 2.5 }}>
                {tabs.value === 'overview' && renderTabOverview}
                {tabs.value === 'subTasks' && renderTabSubtasks}
                {tabs.value === 'comments' && renderTabComments}
            </Scrollbar>

            {tabs.value === 'comments' && <KanbanDetailsCommentInput />}
        </Drawer>
    );
}

export default KanbanDetails;
