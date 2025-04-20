import { useRef, useState, useEffect, useCallback } from 'react';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
    useSensor,
    DndContext,
    useSensors,
    MouseSensor,
    TouchSensor,
    pointerWithin,
    KeyboardSensor,
    rectIntersection,
    getFirstCollision,
    MeasuringStrategy,
    closestCorners,
} from '@dnd-kit/core';
import { useDispatch } from 'react-redux';

import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import { hideScrollY } from '~/theme/styles';
import { DashboardContent } from '~/layouts/dashboard';
import { moveTask, moveColumn, useGetBoard } from '~/actions/kanban';

import { EmptyContent } from '~/components/empty-content';

import { kanbanClasses } from '../classes';
import { coordinateGetter } from '../utils';
import KanbanColumn from '../column/kanban-column';
import KanbanTaskItem from '../item/kanban-task-item';
import { KanbanColumnAdd } from '../column/kanban-column-add';
import { KanbanColumnSkeleton } from '../components/kanban-skeleton';
import { KanbanDragOverlay } from '../components/kanban-drag-overlay';

import { updateBoardData } from '~/store/slices/boardSlice';

const PLACEHOLDER_ID = 'placeholder';

const cssVars = {
    '--item-gap': '16px',
    '--item-radius': '12px',
    '--column-gap': '24px',
    '--column-width': '336px',
    '--column-radius': '16px',
    '--column-padding': '20px 16px 16px 16px',
};

export function KanbanView() {
    const dispatch = useDispatch();
    const { board, boardLoading, boardEmpty } = useGetBoard();

    const [columnFixed, setColumnFixed] = useState(true);

    const recentlyMovedToNewContainer = useRef(false);

    const lastOverId = useRef(null);

    const [activeId, setActiveId] = useState(null);

    const columnIds = board?.columns.map((column) => column.uuid) || [];

    const isSortingContainer = activeId ? columnIds.includes(activeId) : false;

    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
        useSensor(TouchSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter }),
    );

    const collisionDetectionStrategy = useCallback(
        (args) => {
            // handle drag column
            if (activeId && activeId in board.tasks) {
                return closestCorners({
                    ...args,
                    droppableContainers: args.droppableContainers.filter((column) => column.id in board.tasks),
                });
            }

            // Start by finding any intersecting droppable
            const pointerIntersections = pointerWithin(args);

            const intersections =
                pointerIntersections.length > 0
                    ? // If there are droppables intersecting with the pointer, return those
                      pointerIntersections
                    : rectIntersection(args);

            let overId = getFirstCollision(intersections, 'id');

            if (overId != null) {
                if (overId in board.tasks) {
                    const columnItems = board.tasks[overId].map((task) => task.uuid);

                    // If a column is matched and it contains items (columns 'A', 'B', 'C')
                    if (columnItems.length > 0) {
                        const filteredDroppable = args.droppableContainers.filter(
                            (container) => container.id !== overId && columnItems.includes(container.id),
                        );

                        // Return the closest droppable within that column
                        overId = closestCorners({
                            ...args,
                            droppableContainers: filteredDroppable,
                        })[0]?.id;
                    }
                }

                lastOverId.current = overId;

                return [{ id: overId }];
            }

            // When a draggable item moves to a new column, the layout may shift
            // and the `overId` may become `null`. We manually set the cached `lastOverId`
            // to the id of the draggable item that was moved to the new column, otherwise
            // the previous `overId` will be returned which can cause items to incorrectly shift positions
            if (recentlyMovedToNewContainer.current) {
                lastOverId.current = activeId;
            }

            // If no droppable is matched, return the last match
            return lastOverId.current ? [{ id: lastOverId.current }] : [];
        },
        [activeId, board?.tasks],
    );

    const findColumn = (id) => {
        if (id in board.tasks) {
            return id;
        }

        return Object.keys(board.tasks).find((key) => board.tasks[key].map((task) => task.uuid).includes(id));
    };

    useEffect(() => {
        requestAnimationFrame(() => {
            recentlyMovedToNewContainer.current = false;
        });
    }, []);

    // [ ] move func moveColumn
    const moveColumns = (orderedColumns) => {
        const dndOrderedColumnsIds = orderedColumns.map((c) => c.uuid);

        const newBoard = { ...board };
        newBoard.columns = orderedColumns;
        newBoard.columnOrderIds = dndOrderedColumnsIds;

        dispatch(updateBoardData(newBoard));

        // fetch API update board
        // boardService.updateBoard(newBoard.id, { columnOrderIds: dndOrderedColumnsIds });
    };

    /**
     * onDragStart
     */
    const onDragStart = ({ active }) => {
        setActiveId(active.id);
    };

    /**
     * onDragOver
     */
    const onDragOver = ({ active, over }) => {
        const overId = over?.id;

        // Nếu không có phần tử đang hover hoặc đang kéo một column (not a task), thì return
        if (overId == null || active.id in board.tasks) {
            return;
        }

        // Tìm column chứa phần tử đang hover và phần tử đang kéo
        const overColumn = findColumn(overId);
        const activeColumn = findColumn(active.id);

        // Nếu không xác định được column thì bỏ qua
        if (!overColumn || !activeColumn) {
            return;
        }

        // Nếu đang kéo một task giữa 2 column khác nhau
        if (activeColumn !== overColumn) {
            const activeItems = board.tasks[activeColumn].map((task) => task.uuid); // Danh sách task bên column đang kéo
            const overItems = board.tasks[overColumn].map((task) => task.uuid); // Danh sách task bên column đang hover

            const overIndex = overItems.indexOf(overId); // Vị trí của task đang hover
            const activeIndex = activeItems.indexOf(active.id); // Vị trí của task đang kéo

            let newIndex;

            if (overId in board.tasks) {
                // Nếu đang hover lên một column (không phải task) → thêm vào cuối column
                newIndex = overItems.length + 1;
            } else {
                // Kiểm tra xem đang kéo phía dưới task đang hover hay không
                const isBelowOverItem =
                    over &&
                    active.rect.current.translated &&
                    active.rect.current.translated.top > over.rect.top + over.rect.height;

                const modifier = isBelowOverItem ? 1 : 0;

                // Nếu đang hover lên một task, xác định vị trí mới để chèn
                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            // Đánh dấu là vừa mới chuyển task sang column khác
            recentlyMovedToNewContainer.current = true;

            // Cập nhật lại danh sách task trong các column
            const updateTasks = {
                ...board.tasks,
                [activeColumn]: board.tasks[activeColumn].filter((task) => task.uuid !== active.id), // Xóa task khỏi column cũ
                [overColumn]: [
                    ...board.tasks[overColumn].slice(0, newIndex),
                    board.tasks[activeColumn][activeIndex], // Thêm task vào vị trí mới trong column mới
                    ...board.tasks[overColumn].slice(newIndex, board.tasks[overColumn].length),
                ],
            };

            // Cập nhật lại state board với task đã di chuyển
            const newBoard = { ...board, tasks: updateTasks };
            dispatch(updateBoardData(newBoard));

            // Nếu có API thì dùng moveTask(updateTasks) thay vì dispatch trực tiếp
            // moveTask(updateTasks);
        }
    };

    /**
     * onDragEnd
     */
    const onDragEnd = ({ active, over }) => {
        // Nếu phần tử đang kéo (active) là một column và có phần tử đang hover lên (over)
        if (active.id in board.tasks && over?.id) {
            const activeIndex = columnIds.indexOf(active.id);
            const overIndex = columnIds.indexOf(over.id);

            // Di chuyển column trong danh sách theo vị trí mới
            const updateColumns = arrayMove(board.columns, activeIndex, overIndex);
            moveColumns(updateColumns); // cập nhật thứ tự column mới
            // moveColumn(updateColumns); // nếu bạn dùng API server, có thể gọi hàm này thay vì dispatch trực tiếp
        }

        // Tìm column chứa task đang kéo
        const activeColumn = findColumn(active.id);

        // Nếu không tìm được column, reset trạng thái kéo
        if (!activeColumn) {
            setActiveId(null);
            return;
        }

        // ID của phần tử đang hover (nơi sẽ thả task)
        const overId = over?.id;

        // Nếu không có overId, reset trạng thái kéo
        if (overId == null) {
            setActiveId(null);
            return;
        }

        // Tìm column chứa overId (có thể là column hoặc task trong column)
        const overColumn = findColumn(overId);

        if (overColumn) {
            // Lấy danh sách ID task trong column chứa task đang kéo
            const activeContainerTaskIds = board.tasks[activeColumn].map((task) => task.uuid);
            console.log('🚀 ~ onDragEnd ~ activeContainerTaskIds:', activeContainerTaskIds);

            // Lấy danh sách ID task trong column nơi sẽ thả
            const overContainerTaskIds = board.tasks[overColumn].map((task) => task.uuid);
            console.log('🚀 ~ onDragEnd ~ overContainerTaskIds:', overContainerTaskIds);

            // Tìm vị trí (index) của task đang kéo trong column gốc
            const activeIndex = activeContainerTaskIds.indexOf(active.id);
            console.log('🚀 ~ onDragEnd ~ activeIndex:', activeIndex);

            // Tìm vị trí (index) trong column đích (nơi task đang hover)
            const overIndex = overContainerTaskIds.indexOf(overId);
            console.log('🚀 ~ onDragEnd ~ overIndex:', overIndex);

            // Nếu vị trí khác nhau thì thực hiện di chuyển
            if (activeIndex !== overIndex) {
                const updateTasks = {
                    ...board.tasks,
                    // Sử dụng arrayMove để thay đổi thứ tự task trong column đích
                    [overColumn]: arrayMove(board.tasks[overColumn], activeIndex, overIndex),
                };

                const newBoard = { ...board, tasks: updateTasks };

                // Cập nhật store với trạng thái mới sau khi kéo thả
                dispatch(updateBoardData(newBoard));
                // moveTask(updateTasks); // Nếu bạn muốn gọi API để lưu thay đổi lên server
            }
        }

        // Reset trạng thái đang kéo
        setActiveId(null);
    };

    const renderLoading = (
        <Stack direction="row" alignItems="flex-start" sx={{ gap: 'var(--column-gap)' }}>
            <KanbanColumnSkeleton />
        </Stack>
    );

    const renderEmpty = <EmptyContent filled sx={{ py: 10, maxHeight: { md: 480 } }} />;

    const renderList = (
        <DndContext
            id="dnd-kanban"
            sensors={sensors}
            collisionDetection={collisionDetectionStrategy}
            measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
        >
            <Stack sx={{ flex: '1 1 auto', overflowX: 'auto' }}>
                <Stack
                    sx={{
                        pb: 3,
                        display: 'unset',
                        ...(columnFixed && { minHeight: 0, display: 'flex', flex: '1 1 auto' }),
                    }}
                >
                    <Stack
                        direction="row"
                        sx={{
                            gap: 'var(--column-gap)',
                            ...(columnFixed && {
                                minHeight: 0,
                                flex: '1 1 auto',
                                [`& .${kanbanClasses.columnList}`]: { ...hideScrollY, flex: '1 1 auto' },
                            }),
                        }}
                    >
                        <SortableContext
                            items={[...columnIds, PLACEHOLDER_ID]}
                            strategy={horizontalListSortingStrategy}
                        >
                            {board?.columns.map((column) => {
                                const taskIds = board.tasks[column.uuid]?.map((task) => task.uuid) || [];

                                return (
                                    <KanbanColumn key={column.id} column={column} tasks={board.tasks[column.uuid]}>
                                        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
                                            {board.tasks[column.uuid].map((task) => (
                                                <KanbanTaskItem
                                                    task={task}
                                                    key={task.id}
                                                    columnId={column.id}
                                                    disabled={isSortingContainer}
                                                />
                                            ))}
                                        </SortableContext>
                                    </KanbanColumn>
                                );
                            })}

                            <KanbanColumnAdd id={PLACEHOLDER_ID} />
                        </SortableContext>
                    </Stack>
                </Stack>
            </Stack>

            <KanbanDragOverlay columns={board?.columns} tasks={board?.tasks} activeId={activeId} sx={cssVars} />
        </DndContext>
    );

    return (
        <DashboardContent
            maxWidth={false}
            sx={{
                ...cssVars,
                pb: 0,
                pl: { sm: 3 },
                pr: { sm: 0 },
                flex: '1 1 0',
                display: 'flex',
                overflow: 'hidden',
                flexDirection: 'column',
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ pr: { sm: 3 }, mb: { xs: 3, md: 5 } }}
            >
                <Typography variant="h4">Kanban</Typography>

                <FormControlLabel
                    label="Column fixed"
                    labelPlacement="start"
                    control={
                        <Switch
                            checked={columnFixed}
                            onChange={(event) => {
                                setColumnFixed(event.target.checked);
                            }}
                            inputProps={{ id: 'column-fixed-switch' }}
                        />
                    }
                />
            </Stack>

            {boardLoading ? renderLoading : <>{boardEmpty ? renderEmpty : renderList}</>}
        </DashboardContent>
    );
}
