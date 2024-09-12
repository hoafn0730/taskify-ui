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

const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'COLUMN',
    CARD: 'CARD',
};

function BoardContent({ data }) {
    const [orderedColumns, setOrderedColumns] = useState([]);
    const [activeDragItemId, setActiveDragItemId] = useState(null);
    const [activeDragItemType, setActiveDragItemType] = useState(null);
    const [activeDragItemData, setActiveDragItemData] = useState(null);
    const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null);
    const lastOverId = useRef(null);

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
        setOrderedColumns(mapOrder(data?.columns, data?.columnOrderIds, 'id') || []);
    }, [data?.columnOrderIds, data?.columns]);

    const findColumnByCardId = (cardId) => {
        return orderedColumns.find((col) => col.cards.map((c) => c.id).includes(cardId));
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
            const overCardIndex = overColumn?.cards.findIndex((card) => card.id === overCardId);

            let newCardIndex;

            const isBelowOverItem =
                active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height;

            const modifier = isBelowOverItem ? 1 : 0;

            newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1;

            const nextColumns = cloneDeep(prev);
            const nextActiveColumn = nextColumns.find((col) => col.id === activeColumn.id);
            const nextOverColumn = nextColumns.find((col) => col.id === overColumn.id);

            if (nextActiveColumn) {
                nextActiveColumn.cards = nextActiveColumn.cards.filter((card) => card.id !== activeDraggingCardId);

                if (isEmpty(nextActiveColumn.cards)) {
                    nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)];
                }

                nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => card.id);
            }

            if (nextOverColumn) {
                nextOverColumn.cards = nextOverColumn.cards.filter((card) => card.id !== activeDraggingCardId);

                nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, {
                    ...activeDraggingCardData,
                    columnId: nextOverColumn.id,
                });

                nextOverColumn.cards = nextOverColumn.cards.filter((c) => !c.FE_PlaceholderCard);

                nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card.id);
            }

            if (triggerFrom === 'handleDragEnd') {
                console.log(123);

                // moveCardDifferentColumn(
                //     activeDraggingCardId,
                //     oldColumnWhenDraggingCard._id,
                //     nextOverColumn._id,
                //     nextColumns,
                // );
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
                const oldColumnIndex = orderedColumns.findIndex((col) => col.id === active.id);
                const newColumnIndex = orderedColumns.findIndex((col) => col.id === over.id);

                setOrderedColumns(arrayMove(orderedColumns, oldColumnIndex, newColumnIndex));

                // Update to database
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
                    (card) => card.id === activeDraggingCardId,
                );
                const newCardIndex = overColumn.cards.findIndex((card) => card.id === overCardId);

                const orderedCards = arrayMove(oldColumnWhenDraggingCard.cards, oldCardIndex, newCardIndex);
                const orderedCardIds = orderedCards.map((card) => card.is);

                setOrderedColumns((prev) => {
                    const nextColumns = cloneDeep(prev);
                    const targetColumn = nextColumns.find((col) => col.id === overColumn.id);

                    targetColumn.cards = orderedCards;
                    targetColumn.cardOrderIds = orderedCardIds;

                    return nextColumns;
                });

                // Update to database
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
                const checkColumn = orderedColumns.find((col) => col._id === overId);

                if (checkColumn) {
                    overId = closestCorners({
                        ...args,
                        droppableContainers: args.droppableContainers.filter(
                            (container) => container.id !== overId && checkColumn?.cardOrderIds?.includes(container.id),
                        ),
                    })[0].id;
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
                    <SortableContext items={orderedColumns.map((c) => c.id)} strategy={horizontalListSortingStrategy}>
                        {/* List Column */}
                        {orderedColumns.map((col) => (
                            <Column
                                key={col.id}
                                id={col.id}
                                title={col.title}
                                cards={mapOrder(col.cards, col.cardOrderIds, 'id')}
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
