import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable, defaultAnimateLayoutChanges } from '@dnd-kit/sortable';

import { useBoolean } from '~/hooks/use-boolean';

import { toast } from '~/components/snackbar';

import ColumnBase from './column-base';
import KanbanTaskAdd from '../components/kanban-task-add';
import KanbanColumnToolBar from './kanban-column-toolbar';
import { clearColumn, createTask, deleteColumn, updateColumn } from '~/store/actions/kanbanAction';

function KanbanColumn({ children, column, tasks = [], disabled, sx }) {
    const dispatch = useDispatch();
    const openAddTask = useBoolean();
    const { user } = useSelector((state) => state.user);

    const { attributes, isDragging, listeners, setNodeRef, transition, active, over, transform } = useSortable({
        id: column.uuid,
        data: { type: 'container', ...column },
        animateLayoutChanges,
    });

    const tasksIds = tasks?.map((task) => task.uuid) || [];

    const isOverContainer = over
        ? (column.id === over.id && active?.data.current?.type !== 'container') || tasksIds.includes(over.id)
        : false;

    const handleUpdateColumn = useCallback(
        async (columnTitle) => {
            if (column.title !== columnTitle) {
                dispatch(updateColumn({ columnId: column.id, columnData: { title: columnTitle } }));

                toast.success('Update success!', { position: 'top-center' });
            }
        },
        [column.id, column.title, dispatch],
    );

    const handleClearColumn = useCallback(async () => {
        dispatch(clearColumn(column.id));
    }, [column.id, dispatch]);

    const handleDeleteColumn = useCallback(async () => {
        dispatch(deleteColumn(column.id));

        toast.success('Delete success!', { position: 'top-center' });
    }, [column.id, dispatch]);

    const handleAddTask = useCallback(
        async (taskData) => {
            dispatch(
                createTask({
                    columnId: column.id,
                    taskData: { boardId: column.boardId, ...taskData },
                    reporter: {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                        displayName: user.displayName,
                        avatar: user.avatar,
                    },
                }),
            );

            openAddTask.onFalse();
        },
        [column.boardId, column.id, dispatch, openAddTask, user],
    );

    return (
        <ColumnBase
            ref={disabled ? undefined : setNodeRef}
            sx={{ transition, transform: CSS.Translate.toString(transform), ...sx }}
            stateProps={{
                dragging: isDragging,
                hover: isOverContainer,
                handleProps: { ...attributes, ...listeners },
            }}
            slots={{
                header: (
                    <KanbanColumnToolBar
                        handleProps={{ ...attributes, ...listeners }}
                        totalTasks={tasks.length}
                        columnTitle={column.title}
                        onUpdateColumn={handleUpdateColumn}
                        onClearColumn={handleClearColumn}
                        onDeleteColumn={handleDeleteColumn}
                        onToggleAddTask={openAddTask.onToggle}
                    />
                ),
                main: <>{children}</>,
                action: (
                    <KanbanTaskAdd
                        openAddTask={openAddTask.value}
                        onAddTask={handleAddTask}
                        onCloseAddTask={openAddTask.onFalse}
                    />
                ),
            }}
        />
    );
}

const animateLayoutChanges = (args) => defaultAnimateLayoutChanges({ ...args, wasDragging: true });

export default memo(KanbanColumn);
