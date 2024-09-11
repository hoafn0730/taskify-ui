import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import {
    closestCorners,
    defaultDropAnimationSideEffects,
    DndContext,
    DragOverlay,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { useEffect, useRef, useState } from 'react';
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import Column from './Column';
import { mapOrder } from '~/utils/sort';
import Card from './Card';

const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'COLUMN',
    CARD: 'CARD',
};

function BoardContent({ data }) {
    const [orderedColumns, setOrderedColumns] = useState([]);
    const [activeDragActiveId, setActiveDragActiveId] = useState(null);
    const [activeDragActiveType, setActiveDragActiveType] = useState(null);
    const [activeDragActiveData, setActiveDragActiveData] = useState(null);
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

    const handleDragStart = ({ active }) => {
        setActiveDragActiveId(active?.id);
        setActiveDragActiveData(active?.data?.current);
        setActiveDragActiveType(
            active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN,
        );
    };

    const handleDragOver = ({ active, over }) => {};

    const handleDragEnd = ({ active, over }) => {
        console.log('🚀 ~ handleDragEnd ~ over:', over);
        console.log('🚀 ~ handleDragEnd ~ active:', active);
        if (!active || !over) return;

        // Handle drag columns
        if (activeDragActiveType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            if (active.id !== over.id) {
                const oldColumnIndex = orderedColumns.findIndex((col) => col.id === active.id);
                const newColumnIndex = orderedColumns.findIndex((col) => col.id === over.id);

                setOrderedColumns(arrayMove(orderedColumns, oldColumnIndex, newColumnIndex));

                // Update to database
            }
        }

        // Handle drag column
        if (activeDragActiveType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            //
        }

        setActiveDragActiveId(null);
        setActiveDragActiveData(null);
        setActiveDragActiveType(null);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
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
                    {activeDragActiveId && activeDragActiveType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
                        <Column
                            title={activeDragActiveData.title}
                            cards={mapOrder(activeDragActiveData.cards, activeDragActiveData.cardOrderIds, 'id')}
                            data={activeDragActiveData}
                        />
                    )}
                    {activeDragActiveId && activeDragActiveType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
                        <Card
                            title={activeDragActiveData.title}
                            desc={activeDragActiveData.description}
                            image={activeDragActiveData.image}
                            memberIds={activeDragActiveData.memberIds}
                            comments={activeDragActiveData.comments}
                            attachments={activeDragActiveData.attachments}
                            data={activeDragActiveData}
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
