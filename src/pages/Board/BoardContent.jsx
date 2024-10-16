import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import {
    closestCorners,
    defaultDropAnimationSideEffects,
    DndContext,
    DragOverlay,
    getFirstCollision,
    pointerWithin,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { cloneDeep, isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import Column from './Column';
import { mapOrder } from '~/utils/sort';
import Card from './Card';
import { generatePlaceholderCard } from '~/utils/formatters';
import {
    createNewColumn,
    moveCardDifferentColumn,
    moveCardInSameColumn,
    moveColumns,
} from '~/store/actions/boardAction';
import { toast } from 'react-toastify';
import { MouseSensor, TouchSensor } from '~/libs/dndKitSensors';
import { useTranslation } from 'react-i18next';

const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'COLUMN',
    CARD: 'CARD',
};

function BoardContent() {
    const { t } = useTranslation('board');
    const board = useSelector((state) => state.board.boardData);
    const [orderedColumns, setOrderedColumns] = useState([]);
    const [activeDragItemId, setActiveDragItemId] = useState(null);
    const [activeDragItemType, setActiveDragItemType] = useState(null);
    const [activeDragItemData, setActiveDragItemData] = useState(null);
    const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null);
    const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
    const [newColumnTitle, setNewColumnTitle] = useState('');
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
                        currentCardId: oldColumnWhenDraggingCard.cards.find(
                            (card) => card.uuid === activeDraggingCardId,
                        ).id,
                        prevColumnId: oldColumnWhenDraggingCard.id,
                        nextColumnId: nextOverColumn.id,
                        orderedColumns: nextColumns,
                    }),
                );
            }

            return nextColumns;
        });
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
                if (activeDraggingCardId === overCardId) return;

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
        setOldColumnWhenDraggingCard(null);
    };

    const handleAddNewColumn = () => {
        if (newColumnTitle.startsWith(' ')) return;
        if (!newColumnTitle) {
            toast.error('Please enter column title!');
            return;
        }
        const newColumnData = {
            title: newColumnTitle,
            boardId: board.id,
        };

        dispatch(createNewColumn(newColumnData));

        toggleNewColumnForm();
        setNewColumnTitle('');
    };

    const toggleNewColumnForm = () => setOpenNewColumnForm((prev) => !prev);

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

                    {!openNewColumnForm ? (
                        <Box
                            sx={{
                                minWidth: '250px',
                                maxWidth: '250px',
                                mx: 2,
                                borderRadius: '6px',
                                height: 'fit-content',
                                bgcolor: '#ffffffed',
                            }}
                        >
                            <Button
                                sx={{
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    pl: 2.5,
                                    py: 1,
                                    // bgcolor: 'rgba(255, 255, 255, 0.16)',
                                    // color: (theme) =>
                                    //     theme.palette.mode === 'dark' ? theme.palette.common.white : 'primary.main',
                                    '&:hover': {
                                        color: (theme) => theme.palette.mode === 'dark' && theme.palette.primary.main,
                                        bgcolor: (theme) =>
                                            theme.palette.mode === 'dark' && theme.palette.primary['50'],
                                    },
                                }}
                                startIcon={<NoteAddIcon />}
                                onClick={toggleNewColumnForm}
                            >
                                {t('addNewColumn')}
                            </Button>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                minWidth: '250px',
                                maxWidth: '250px',
                                mx: 2,
                                p: 1,
                                borderRadius: '6px',
                                height: 'fit-content',
                                bgcolor: '#ffffffed',
                            }}
                        >
                            <TextField
                                value={newColumnTitle}
                                label={t('enterColumnTitle')}
                                type="text"
                                variant="outlined"
                                size="small"
                                autoFocus
                                sx={{
                                    width: '100%',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: (theme) =>
                                                theme.palette.mode === 'dark'
                                                    ? theme.palette.common.white
                                                    : theme.palette.primary.main,
                                        },
                                        '&:hover fieldset': {
                                            borderColor: (theme) =>
                                                theme.palette.mode === 'dark'
                                                    ? theme.palette.common.white
                                                    : theme.palette.primary.main,
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: (theme) =>
                                                theme.palette.mode === 'dark'
                                                    ? theme.palette.common.white
                                                    : theme.palette.primary.main,
                                        },
                                    },
                                }}
                                onChange={(e) => setNewColumnTitle(e.target.value)}
                            />
                            <Box sx={{ display: 'flex', marginTop: 1, alignItems: 'center', gap: 1 }}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    sx={{
                                        color: 'white',
                                        boxShadow: 'none',
                                        border: '0.5px solid',
                                        borderColor: (theme) => theme.palette.success.main,
                                        '&:hover': { bgcolor: (theme) => theme.palette.success.main },
                                    }}
                                    onClick={handleAddNewColumn}
                                >
                                    {t('addColumn')}
                                </Button>
                                <CloseIcon
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.mode === 'dark'
                                                ? theme.palette.common.white
                                                : theme.palette.primary.main,
                                        cursor: 'pointer',
                                        '&:hover': { color: (theme) => theme.palette.warning.light },
                                    }}
                                    onClick={() => {
                                        toggleNewColumnForm();
                                        setNewColumnTitle('');
                                    }}
                                />
                            </Box>
                        </Box>
                    )}
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
