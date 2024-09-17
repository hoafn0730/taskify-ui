import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import {
    closestCorners,
    defaultDropAnimationSideEffects,
    DndContext,
    DragOverlay,
    getFirstCollision,
    MouseSensor,
    pointerWithin,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { cloneDeep, isEmpty } from 'lodash';

import Column from './Column';
import { mapOrder } from '~/utils/sort';
import Card from './Card';
import { generatePlaceholderCard } from '~/utils/formatters';
import { moveCardDifferentColumn, moveCardInSameColumn, moveColumns } from '~/store/actions/boardAction';
import { useDispatch, useSelector } from 'react-redux';

const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'COLUMN',
    CARD: 'CARD',
};

function BoardContent() {
    const board = useSelector((state) => state.board.boardData);
    const [orderedColumns, setOrderedColumns] = useState([]);
    const [activeDragItemId, setActiveDragItemId] = useState(null);
    const [activeDragItemType, setActiveDragItemType] = useState(null);
    const [activeDragItemData, setActiveDragItemData] = useState(null);
    const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null);
    const lastOverId = useRef(null);
    const dispatch = useDispatch();

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: { distance: 10 },
    });
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: { delay: 250, tolerance: 500 },
    });
    const sensors = useSensors(mouseSensor, touchSensor);

    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5',
                },
            },
        }),
    };

    useEffect(() => {
        setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, 'uuid') || []);
    }, [board]);

    const findColumnByCardId = (cardId) => {
        return orderedColumns.find((col) => col.cards.map((c) => c.uuid).includes(cardId));
    };

    const moveCardBetweenDifferentColumns = (
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData,
        triggerFrom,
    ) => {
        setOrderedColumns((prev) => {
            const overCardIndex = overColumn?.cards.findIndex((card) => card.uuid === overCardId);

            let newCardIndex;

            const isBelowOverItem =
                active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height;

            const modifier = isBelowOverItem ? 1 : 0;

            newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1;

            const nextColumns = cloneDeep(prev);
            const nextActiveColumn = nextColumns.find((col) => col.uuid === activeColumn.uuid);
            const nextOverColumn = nextColumns.find((col) => col.uuid === overColumn.uuid);

            if (nextActiveColumn) {
                nextActiveColumn.cards = nextActiveColumn.cards.filter((card) => card.uuid !== activeDraggingCardId);

                if (isEmpty(nextActiveColumn.cards)) {
                    nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)];
                }

                nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => card.uuid);
            }

            if (nextOverColumn) {
                nextOverColumn.cards = nextOverColumn.cards.filter((card) => card.uuid !== activeDraggingCardId);

                nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, {
                    ...activeDraggingCardData,
                    columnId: nextOverColumn.id,
                });

                nextOverColumn.cards = nextOverColumn.cards.filter((c) => !c.FE_PlaceholderCard);

                nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card.uuid);
            }

            if (triggerFrom === 'handleDragEnd') {
                dispatch(
                    moveCardDifferentColumn({
                        currentCardId: nextOverColumn.cards.find((card) => card.uuid === activeDraggingCardId).id,
                        prevColumnId: oldColumnWhenDraggingCard.id,
                        nextColumnId: nextOverColumn.id,
                        orderedColumns: nextColumns,
                    }),
                );
            }

            return nextColumns;
        });
    };

    const handleDragStart = ({ active }) => {
        setActiveDragItemId(active?.id);
        setActiveDragItemData(active?.data?.current);
        setActiveDragItemType(
            active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN,
        );
        if (active?.data?.current?.columnId) {
            setOldColumnWhenDraggingCard(findColumnByCardId(active?.id));
        }
    };

    const handleDragOver = ({ active, over }) => {
        if (!active || !over) return;

        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

        const {
            id: activeDraggingCardId,
            data: { current: activeDraggingCardData },
        } = active;
        const { id: overCardId } = over;

        const activeColumn = findColumnByCardId(activeDraggingCardId);
        const overColumn = findColumnByCardId(overCardId);

        if (!activeColumn || !overColumn) return;

        if (activeColumn.id !== overColumn.id) {
            moveCardBetweenDifferentColumns(
                overColumn,
                overCardId,
                active,
                over,
                activeColumn,
                activeDraggingCardId,
                activeDraggingCardData,
                'handleDragOver',
            );
        }
    };

    const handleDragEnd = ({ active, over }) => {
        if (!active || !over) return;

        // Handle drag columns
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            if (active.id !== over.id) {
                const oldColumnIndex = orderedColumns.findIndex((col) => col.uuid === active.id);
                const newColumnIndex = orderedColumns.findIndex((col) => col.uuid === over.id);

                const newOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex);

                setOrderedColumns(newOrderedColumns);

                // Update to database
                dispatch(
                    moveColumns({
                        columnOrderIds: newOrderedColumns.map((c) => c.uuid),
                    }),
                );
            }
        }

        // Handle drag column
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            const {
                id: activeDraggingCardId,
                data: { current: activeDraggingCardData },
            } = active;
            const { id: overCardId } = over;

            const activeColumn = findColumnByCardId(activeDraggingCardId);
            const overColumn = findColumnByCardId(overCardId);

            if (!activeColumn || !overColumn) return;

            // Drag cards between different columns
            if (oldColumnWhenDraggingCard.id !== overColumn.id) {
                moveCardBetweenDifferentColumns(
                    overColumn,
                    overCardId,
                    active,
                    over,
                    activeColumn,
                    activeDraggingCardId,
                    activeDraggingCardData,
                    'handleDragEnd',
                );
            }
            // Drag cards in the same column
            else {
                const oldCardIndex = oldColumnWhenDraggingCard.cards.findIndex(
                    (card) => card.uuid === activeDraggingCardId,
                );
                const newCardIndex = overColumn.cards.findIndex((card) => card.uuid === overCardId);

                const orderedCards = arrayMove(oldColumnWhenDraggingCard.cards, oldCardIndex, newCardIndex);
                const orderedCardIds = orderedCards.map((card) => card.uuid);

                setOrderedColumns((prev) => {
                    const nextColumns = cloneDeep(prev);
                    const targetColumn = nextColumns.find((col) => col.uuid === overColumn.uuid);

                    targetColumn.cards = orderedCards;
                    targetColumn.cardOrderIds = orderedCardIds;

                    return nextColumns;
                });

                // Update to database
                dispatch(
                    moveCardInSameColumn({
                        columnId: oldColumnWhenDraggingCard.id,
                        orderedCards: orderedCards,
                        orderedCardIds: orderedCardIds,
                    }),
                );
            }
        }

        setActiveDragItemId(null);
        setActiveDragItemData(null);
        setActiveDragItemType(null);
    };

    const collisionDetectionStrategy = useCallback(
        (args) => {
            if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
                return closestCorners({ ...args });
            }

            const pointerIntersections = pointerWithin(args);

            if (!pointerIntersections?.length) return;

            // const intersections = !!pointerIntersections?.length ? pointerIntersections : rectIntersection(args);

            let overId = getFirstCollision(pointerIntersections, 'id');

            if (overId) {
                const checkColumn = orderedColumns.find((col) => col.uuid === overId);

                if (checkColumn) {
                    overId = closestCorners({
                        ...args,
                        droppableContainers: args.droppableContainers.filter(
                            (container) => container.id !== overId && checkColumn?.cardOrderIds?.includes(container.id),
                        ),
                    })[0]?.id;
                }

                lastOverId.current = overId;

                return [{ id: overId }];
            }

            return lastOverId.current ? [{ id: lastOverId.current }] : [];
        },
        [activeDragItemType, orderedColumns],
    );

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={collisionDetectionStrategy}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <Box
                sx={{
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#ebecf0'),
                    width: '100%',
                    height: (theme) => theme.app.boardContentHeight,
                    p: '10px 0',
                }}
            >
                <Box
                    sx={{
                        height: '100%',
                        display: 'flex',
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        '&::-webkit-scrollbar-track': { m: 2 },
                    }}
                >
                    <SortableContext items={orderedColumns.map((c) => c.uuid)} strategy={horizontalListSortingStrategy}>
                        {/* List Column */}
                        {orderedColumns.map((col) => (
                            <Column
                                key={col.id}
                                title={col.title}
                                cards={mapOrder(col.cards, col.cardOrderIds, 'uuid')}
                                data={col}
                            />
                        ))}
                    </SortableContext>
                </Box>

                <DragOverlay dropAnimation={dropAnimation}>
                    {activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
                        <Column
                            title={activeDragItemData.title}
                            cards={mapOrder(activeDragItemData.cards, activeDragItemData.cardOrderIds, 'id')}
                            data={activeDragItemData}
                        />
                    )}
                    {activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
                        <Card
                            title={activeDragItemData.title}
                            desc={activeDragItemData.description}
                            image={activeDragItemData.image}
                            memberIds={activeDragItemData.memberIds}
                            comments={activeDragItemData.comments}
                            attachments={activeDragItemData.attachments}
                            data={activeDragItemData}
                        />
                    )}
                </DragOverlay>
            </Box>
        </DndContext>
    );
}

BoardContent.propTypes = {
    data: PropTypes.object,
};
export default BoardContent;
