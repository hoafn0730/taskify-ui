import { useDispatch } from 'react-redux';
import { memo, useCallback } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable, defaultAnimateLayoutChanges } from '@dnd-kit/sortable';

import { useBoolean } from '~/hooks/use-boolean';

import { createTask, clearColumn } from '~/actions/kanban';

import { toast } from '~/components/snackbar';

import ColumnBase from './column-base';
import KanbanTaskAdd from '../components/kanban-task-add';
import KanbanColumnToolBar from './kanban-column-toolbar';
import { deleteColumn } from '~/store/actions/kanbanAction';
import { kanbanService } from '~/services/kanbanService';

// ----------------------------------------------------------------------

function KanbanColumn({ children, column, tasks = [], disabled, sx }) {
    const dispatch = useDispatch();
    const openAddTask = useBoolean();

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
            try {
                if (column.title !== columnTitle) {
                    kanbanService.updateColumn(column.id, { title: columnTitle });

                    toast.success('Update success!', { position: 'top-center' });
                }
            } catch (error) {
                console.error(error);
            }
        },
        [column.id, column.title],
    );

    // [ ] update api clear column
    const handleClearColumn = useCallback(async () => {
        try {
            clearColumn(column.id);
        } catch (error) {
            console.error(error);
        }
    }, [column.id]);

    const handleDeleteColumn = useCallback(async () => {
        try {
            dispatch(deleteColumn(column.id));

            toast.success('Delete success!', { position: 'top-center' });
        } catch (error) {
            console.error(error);
        }
    }, [column.id, dispatch]);

    // [ ] update add task
    const handleAddTask = useCallback(
        async (taskData) => {
            try {
                createTask(column.id, taskData);

                openAddTask.onFalse();
            } catch (error) {
                console.error(error);
            }
        },
        [column.id, openAddTask],
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
                        status={column.name}
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
