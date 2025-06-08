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
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';
import { toast } from 'sonner';

import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import { hideScrollY } from '~/theme/styles';
import { DashboardContent } from '~/layouts/dashboard';
import { useGetBoard } from '~/actions/kanban';

import { Iconify } from '~/components/iconify';

import { kanbanClasses } from '../classes';
import { coordinateGetter } from '../utils';
import KanbanColumn from '../column/kanban-column';
import KanbanTaskItem from '../item/kanban-task-item';
import { KanbanColumnAdd } from '../column/kanban-column-add';
import { KanbanColumnSkeleton } from '../components/kanban-skeleton';
import { KanbanDragOverlay } from '../components/kanban-drag-overlay';

import { updateBoardData } from '~/store/slices/kanbanSlice';
import { kanbanService } from '~/services/kanbanService';
import { mapOrder } from '~/utils/sort';
import KanbanMenu from '../menu/kanban-menu';
import { KanbanShareDialog } from '../components/kanban-share-dialog';

import { useBoolean } from '~/hooks/use-boolean';
import { useCopyToClipboard } from '~/hooks/use-copy-to-clipboard';
import { KanbanGuard } from '~/auth/guard/kanban-guard';

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
    const { user } = useSelector((state) => state.user);
    const { board, boardLoading } = useGetBoard();

    const openMenu = useBoolean();

    const share = useBoolean();
    const { copy } = useCopyToClipboard();
    const [inviteEmail, setInviteEmail] = useState('');

    const handleChangeInvite = useCallback((event) => {
        setInviteEmail(event.target.value);
    }, []);

    const handleCopy = useCallback(() => {
        toast.success('Copied!');
        copy(`${window.location.origin}/dashboard/kanban/${board?.slug}`);
    }, [board?.slug, copy]);

    const handleSendInvite = useCallback(async () => {
        await kanbanService.invite(board?.id, inviteEmail);
        setInviteEmail('');
        toast.success(`Invitation sent to ${inviteEmail}`);
    }, [board?.id, inviteEmail]);

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
        if (id in board.tasks) return id;
        return Object.keys(board.tasks).find((key) => board.tasks[key].some((task) => task.uuid === id));
    };

    useEffect(() => {
        requestAnimationFrame(() => {
            recentlyMovedToNewContainer.current = false;
        });
    }, []);

    const moveColumn = (orderedColumns) => {
        const dndOrderedColumnsIds = orderedColumns.map((c) => c.uuid);

        const newBoard = { ...board };
        newBoard.columns = orderedColumns;
        newBoard.columnOrderIds = dndOrderedColumnsIds;

        // fetch API update board
        kanbanService
            .updateBoard(board.id, { columnOrderIds: orderedColumns.map((col) => col.uuid) })
            .then(() => dispatch(updateBoardData(newBoard)));
    };

    const moveTaskInSameColumn = (updateTasks, orderedTasks, columnId) => {
        const newBoard = cloneDeep(board);
        newBoard.tasks = updateTasks;

        const dndOrderedTasksIds = orderedTasks.map((task) => task.uuid);
        const newColumn = newBoard.columns.find((col) => col.id === columnId);
        newColumn.cardOrderIds = dndOrderedTasksIds;

        // Cập nhật store với trạng thái mới sau khi kéo thả
        kanbanService
            .updateColumn(columnId, { cardOrderIds: orderedTasks.map((task) => task.uuid) })
            .then(() => dispatch(updateBoardData(newBoard)));
    };

    const moveTaskToDifferentColumn = (
        updateTasks,
        updatedColumns,
        currentCardId,
        prevColumnId,
        prevCardOrderIds,
        nextColumnId,
        nextCardOrderIds,
    ) => {
        const newBoard = {
            ...board,
            columns: updatedColumns,
            tasks: updateTasks,
        };

        // fetch API update board
        kanbanService
            .moveCardToDifferentColumn(board.id, {
                currentCardId,
                prevColumnId,
                prevCardOrderIds,
                nextColumnId,
                nextCardOrderIds,
            })
            .then(() => dispatch(updateBoardData(newBoard)));
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

            const prevColumn = board.columns.find((col) => col.uuid === activeColumn);
            const nextColumn = board.columns.find((col) => col.uuid === overColumn);

            const activeTasks = board.tasks[activeColumn].filter((task) => task.uuid !== active.id);
            const overTasks = board.tasks[overColumn].toSpliced(newIndex, 0, {
                ...board.tasks[activeColumn][activeIndex],
                columnId: nextColumn.id,
            });

            // Cập nhật lại danh sách task trong các column
            const updateTasks = {
                ...board.tasks,
                [activeColumn]: activeTasks, // Xóa task khỏi column cũ
                [overColumn]: overTasks,
            };

            // Đồng thời update luôn board.columns
            const updatedColumns = board.columns.map((col) => {
                if (col.uuid === activeColumn) {
                    return {
                        ...col,
                        cardOrderIds: activeTasks.map((task) => task.uuid),
                    };
                }
                if (col.uuid === overColumn) {
                    return {
                        ...col,
                        cardOrderIds: overTasks.map((task) => task.uuid),
                    };
                }
                return col;
            });

            const currentCardId = active.data.current.id;
            const prevColumnId = prevColumn.id;
            const prevCardOrderIds = activeTasks.map((task) => task.uuid);
            const nextColumnId = nextColumn.id;
            const nextCardOrderIds = overTasks.map((task) => task.uuid);

            moveTaskToDifferentColumn(
                updateTasks,
                updatedColumns,
                currentCardId,
                prevColumnId,
                prevCardOrderIds,
                nextColumnId,
                nextCardOrderIds,
            );
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
            moveColumn(updateColumns); // cập nhật thứ tự column mới
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

            // Lấy danh sách ID task trong column nơi sẽ thả
            const overContainerTaskIds = board.tasks[overColumn].map((task) => task.uuid);

            // Tìm vị trí (index) của task đang kéo trong column gốc
            const activeIndex = activeContainerTaskIds.indexOf(active.id);

            // Tìm vị trí (index) trong column đích (nơi task đang hover)
            const overIndex = overContainerTaskIds.indexOf(overId);

            // Nếu vị trí khác nhau thì thực hiện di chuyển
            if (activeIndex !== overIndex) {
                const orderedTasks = arrayMove(board.tasks[overColumn], activeIndex, overIndex);
                const updateTasks = {
                    ...board.tasks,
                    // Sử dụng arrayMove để thay đổi thứ tự task trong column đích
                    [overColumn]: orderedTasks,
                };
                const columnId = board.columns.find((col) => col.uuid === overColumn)?.id;

                moveTaskInSameColumn(updateTasks, orderedTasks, columnId);
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
                                const taskIds = column.cardOrderIds || [];
                                const orderedTasks = mapOrder(board.tasks[column.uuid], taskIds, 'uuid');

                                return (
                                    <KanbanColumn key={column.id} column={column} tasks={orderedTasks}>
                                        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
                                            {orderedTasks.map((task) => (
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

                            <KanbanColumnAdd id={PLACEHOLDER_ID} board={board} />
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
            <KanbanGuard
                hasContent
                boardMembers={board?.members}
                user={user}
                acceptRoles={['member', 'admin', 'owner']}
                isActive={true}
                sx={{ py: 10 }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ pr: { sm: 3, md: 3, lg: 0 }, mb: { xs: 3, md: 5 } }}
                >
                    <Typography variant="h4">{board?.title}</Typography>

                    <Box sx={{ display: 'flex', gap: 2 }}>
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
                        <IconButton onClick={share.onTrue}>
                            <Iconify icon="solar:users-group-rounded-bold" />
                        </IconButton>

                        <IconButton onClick={share.onTrue}>
                            <Iconify icon="ic:round-filter-list" />
                        </IconButton>

                        <IconButton onClick={openMenu.onTrue}>
                            <Iconify icon="eva:more-horizontal-fill" />
                        </IconButton>
                    </Box>
                </Stack>

                {boardLoading ? renderLoading : renderList}

                <KanbanMenu open={openMenu.value} onClose={openMenu.onFalse} />

                <KanbanShareDialog
                    open={share.value}
                    members={board?.members}
                    inviteEmail={inviteEmail}
                    onChangeInvite={handleChangeInvite}
                    onCopyLink={handleCopy}
                    onSendInvite={handleSendInvite}
                    onClose={() => {
                        share.onFalse();
                        setInviteEmail('');
                    }}
                />
            </KanbanGuard>
        </DashboardContent>
    );
}
