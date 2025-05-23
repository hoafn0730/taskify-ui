import { DragOverlay as DndDragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core';

import Portal from '@mui/material/Portal';

import ItemBase from '../item/item-base';
import ColumnBase from '../column/column-base';
import KanbanColumnToolBar from '../column/kanban-column-toolbar';
import { mapOrder } from '~/utils/sort';

const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } }),
};

export function KanbanDragOverlay({ columns, tasks, activeId, sx }) {
    const columnIds = columns?.map((column) => column.uuid);

    const activeColumn = columns?.find((column) => column.uuid === activeId);

    const allTasks = Object.values(tasks || []).flat();

    const activeTask = allTasks.find((task) => task.uuid === activeId);

    return (
        <Portal>
            <DndDragOverlay adjustScale={false} dropAnimation={dropAnimation}>
                {activeId ? (
                    <>
                        {columnIds.includes(activeId) ? (
                            <ColumnOverlay
                                column={activeColumn}
                                tasks={mapOrder(tasks[activeId], activeColumn.cardOrderIds, 'uuid')}
                                sx={sx}
                            />
                        ) : (
                            <TaskItemOverlay task={activeTask} sx={sx} />
                        )}
                    </>
                ) : null}
            </DndDragOverlay>
        </Portal>
    );
}

// ----------------------------------------------------------------------

export function ColumnOverlay({ column, tasks = [], sx }) {
    return (
        <ColumnBase
            slots={{
                header: <KanbanColumnToolBar columnName={column.title} totalTasks={tasks.length} />,
                main: tasks.map((task) => <ItemBase key={task.id} task={task} />),
            }}
            stateProps={{ dragOverlay: true }}
            sx={sx}
        />
    );
}

// ----------------------------------------------------------------------

export function TaskItemOverlay({ task, sx }) {
    return <ItemBase task={task} sx={sx} stateProps={{ dragOverlay: true }} />;
}
