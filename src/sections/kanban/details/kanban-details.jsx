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
import InputBase from '@mui/material/InputBase';

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
import { CustomPopover, usePopover } from '~/components/custom-popover';
import { MenuItem, MenuList } from '@mui/material';

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

    const [subtaskCompleted, setSubtaskCompleted] = useState([]);
    const [activeChecklistIndex, setActiveChecklistIndex] = useState(null);
    const [newItemText, setNewItemText] = useState('');
    const [selectedCheckItem, setSelectedCheckItem] = useState(null);
    const popover = usePopover();

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

    const handleClickSubtaskComplete = async (item) => {
        const isCompleted = item.status === 'complete';
        const updatedStatus = isCompleted ? 'incomplete' : 'complete';

        await kanbanService.updateCheckItem(+item.checklistId, item.id, { status: updatedStatus });

        // Cập nhật checklist items
        const updatedChecklists = task.checklists.map((cl) => ({
            ...cl,
            items: cl.items.map((i) => (i.id === item.id ? { ...i, status: updatedStatus } : i)),
        }));

        // Cập nhật task trong board
        const newBoard = cloneDeep(board);
        const column = newBoard.columns.find((col) => col.id === task.columnId);

        const tasksInColumn = newBoard.tasks[column.uuid] || [];
        const taskIndex = tasksInColumn.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) {
            tasksInColumn[taskIndex] = {
                ...task,
                checklists: updatedChecklists,
            };
            newBoard.tasks[column.uuid] = tasksInColumn;
            dispatch(updateBoardData(newBoard));
        }

        // Cập nhật state phụ
        if (!isCompleted) {
            setSubtaskCompleted([...subtaskCompleted, item]);
        } else {
            setSubtaskCompleted(subtaskCompleted.filter((i) => i.id !== item.id));
        }
    };

    const handleDeleteChecklist = async (index) => {
        await kanbanService.deleteChecklist(task.checklists[index].id);

        const newChecklists = [...task.checklists];
        newChecklists.splice(index, 1);

        const newBoard = cloneDeep(board);
        const column = newBoard.columns.find((col) => col.id === task.columnId);

        const tasksInColumn = newBoard.tasks[column.uuid] || [];
        const taskIndex = tasksInColumn.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) {
            tasksInColumn[taskIndex] = {
                ...task,
                checklists: newChecklists,
            };
            newBoard.tasks[column.uuid] = tasksInColumn;
            dispatch(updateBoardData(newBoard));
        }
    };

    const handleDeleteCheckItem = async (checklistId, itemId) => {
        // Call the API to delete the check item
        await kanbanService.deleteCheckItem(checklistId, itemId);

        // Update the local state
        const newBoard = cloneDeep(board);
        const column = newBoard.columns.find((col) => col.id === task.columnId);

        if (!column) return;

        const tasksInColumn = newBoard.tasks[column.uuid] || [];
        const taskIndex = tasksInColumn.findIndex((t) => t.id === task.id);

        if (taskIndex !== -1) {
            // Update the checklists array
            const updatedChecklists = task.checklists.map((checklist) => {
                if (checklist.id === checklistId) {
                    return {
                        ...checklist,
                        items: checklist.items.filter((item) => item.id !== itemId),
                    };
                }
                return checklist;
            });

            tasksInColumn[taskIndex] = {
                ...task,
                checklists: updatedChecklists,
            };

            newBoard.tasks[column.uuid] = tasksInColumn;
            dispatch(updateBoardData(newBoard));
        }

        popover.onClose();
    };

    const handleConfirmAddItem = async (index) => {
        if (newItemText.trim() === '') return;

        const newItem = {
            title: newItemText,
            status: 'incomplete',
        };

        const newChecklists = [...task.checklists];

        const res = await kanbanService.createNewCheckItem(newChecklists[index].id, newItem);

        newChecklists[index] = {
            ...newChecklists[index],
            items: [...newChecklists[index].items, res],
        };

        const newBoard = cloneDeep(board);
        const column = newBoard.columns.find((col) => col.id === task.columnId);

        const tasksInColumn = newBoard.tasks[column.uuid] || [];
        const taskIndex = tasksInColumn.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) {
            tasksInColumn[taskIndex] = {
                ...task,
                checklists: newChecklists,
            };
            newBoard.tasks[column.uuid] = tasksInColumn;
            dispatch(updateBoardData(newBoard));
        }

        setNewItemText('');
        setActiveChecklistIndex(null);
    };

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
        <>
            <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
                {task.checklists.map((checklist, checklistIndex) => {
                    const completedItems = checklist.items.filter((item) => item.status === 'complete');
                    const progress =
                        checklist.items.length > 0 ? (completedItems.length / checklist.items.length) * 100 : 0;

                    return (
                        <Box
                            key={checklist.id}
                            sx={{
                                p: 2,
                                borderRadius: 1,
                                bgcolor: 'background.neutral',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1.5,
                            }}
                        >
                            {/* Checklist header */}
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant="subtitle1">{checklist.title}</Typography>
                                <Button
                                    variant="soft"
                                    color="inherit"
                                    size="small"
                                    onClick={() => handleDeleteChecklist(checklistIndex)}
                                >
                                    Delete
                                </Button>
                            </Box>

                            {/* Progress */}
                            <Typography variant="caption">{Math.round(progress)}%</Typography>
                            <LinearProgress variant="determinate" value={progress} />

                            {/* Items */}
                            <FormGroup>
                                {checklist.items.map((item) => (
                                    <Box
                                        key={item.id}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    disableRipple
                                                    checked={item.status === 'complete'}
                                                    onChange={() => handleClickSubtaskComplete(item)}
                                                />
                                            }
                                            label={item.title}
                                            sx={{ flexGrow: 1 }} // giúp label chiếm hết chiều ngang còn lại
                                        />
                                        <IconButton
                                            color={popover.open ? 'inherit' : 'default'}
                                            onClick={(e) => {
                                                setSelectedCheckItem({ checklistId: checklist.id, item });
                                                popover.onOpen(e);
                                            }}
                                        >
                                            <Iconify icon="eva:more-horizontal-fill" />
                                        </IconButton>
                                    </Box>
                                ))}
                            </FormGroup>

                            {/* Add item */}
                            {activeChecklistIndex === checklistIndex ? (
                                <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                                    <InputBase
                                        fullWidth
                                        autoFocus
                                        value={newItemText}
                                        onChange={(e) => setNewItemText(e.target.value)}
                                        placeholder="Add an item"
                                        sx={{
                                            px: 1.5,
                                            py: 0.75,
                                            borderRadius: 1,
                                            bgcolor: 'background.paper',
                                            border: '1px solid #555',
                                            color: 'text.primary',
                                            fontSize: 14,
                                        }}
                                    />
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleConfirmAddItem(checklistIndex)}
                                        >
                                            Add
                                        </Button>
                                        <Button
                                            variant="text"
                                            color="inherit"
                                            onClick={() => {
                                                setActiveChecklistIndex(null);
                                                setNewItemText('');
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button variant="contained" onClick={() => setActiveChecklistIndex(checklistIndex)}>
                                        Add an item
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    );
                })}
            </Box>

            <CustomPopover open={popover.open} anchorEl={popover.anchorEl} onClose={popover.onClose}>
                <MenuList>
                    <MenuItem onClick={popover.onClose}>
                        <Iconify icon="solar:pen-bold" />
                        Rename
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            if (selectedCheckItem) {
                                handleDeleteCheckItem(selectedCheckItem.checklistId, selectedCheckItem.item.id);
                            }
                            popover.onClose();
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
