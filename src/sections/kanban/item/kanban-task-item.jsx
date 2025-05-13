import { useSortable } from '@dnd-kit/sortable';
import { useState, useEffect, useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';

import { useBoolean } from '~/hooks/use-boolean';

import { deleteTask } from '~/actions/kanban';

import { toast } from '~/components/snackbar';
import { imageClasses } from '~/components/image';

import ItemBase from './item-base';
import KanbanDetails from '../details/kanban-details';
import { updateTask } from '~/store/actions/kanbanAction';

function KanbanTaskItem({ task, disabled, columnId, sx }) {
    const openDetails = useBoolean();
    const dispatch = useDispatch();

    const { setNodeRef, listeners, isDragging, isSorting, transform, transition } = useSortable({
        id: task?.uuid,
        data: task,
    });

    const mounted = useMountStatus();

    const mountedWhileDragging = isDragging && !mounted;

    // [ ]: handleDeleteTask
    const handleDeleteTask = useCallback(async () => {
        try {
            deleteTask(columnId, task.id);
            toast.success('Delete success!', { position: 'top-center' });
        } catch (error) {
            console.error(error);
        }
    }, [columnId, task.id]);

    // [ ]: handleUpdateTask
    const handleUpdateTask = useCallback(
        async (taskData) => {
            dispatch(updateTask({ columnId, taskData }));
        },
        [columnId, dispatch],
    );

    return (
        <>
            <ItemBase
                ref={disabled ? undefined : setNodeRef}
                task={task}
                onClick={openDetails.onTrue}
                stateProps={{
                    transform,
                    listeners,
                    transition,
                    sorting: isSorting,
                    dragging: isDragging,
                    fadeIn: mountedWhileDragging,
                }}
                sx={{ ...(openDetails.value && { [`& .${imageClasses.root}`]: { opacity: 0.8 } }), ...sx }}
            />

            <KanbanDetails
                task={task}
                openDetails={openDetails.value}
                onCloseDetails={openDetails.onFalse}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
            />
        </>
    );
}

// ----------------------------------------------------------------------

function useMountStatus() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), 500);

        return () => clearTimeout(timeout);
    }, []);

    return isMounted;
}

export default memo(KanbanTaskItem);
