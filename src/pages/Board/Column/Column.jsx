import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { useConfirm } from 'material-ui-confirm';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';
import { toast } from 'react-toastify';

import Footer from './Footer';
import Header from './Header';
import Card from '../Card';
import { updateBoardData } from '~/store/slices/boardSlice';
import { columnService } from '~/services/columnService';
import { cardService } from '~/services/cardService';

function Column({ column }) {
    const board = useSelector((state) => state.board.activeBoard);
    const [openNewCardForm, setOpenNewCardForm] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState('');
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: column?.uuid,
        data: { ...column },
    });
    const confirm = useConfirm();
    const dispatch = useDispatch();

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        height: '100%',
        opacity: isDragging ? 0.5 : undefined,
    };

    const handleAddNewCard = async () => {
        if (newCardTitle.startsWith(' ')) return;
        if (!newCardTitle) {
            toast.error('Please enter card title!');
            return;
        }
        const newCardData = {
            title: newCardTitle,
            columnId: column.id,
        };

        const createdCard = await cardService.createNewCard({ ...newCardData, boardId: board.id });

        const newBoard = cloneDeep(board);
        const columnToUpdate = newBoard.columns.find((col) => col.id === createdCard.columnId);

        if (columnToUpdate) {
            if (columnToUpdate.cards.some((c) => c.FE_PlaceholderCard)) {
                columnToUpdate.cards = [createdCard];
                columnToUpdate.cardOrderIds = [createdCard.uuid];
            } else {
                columnToUpdate.cards.push(createdCard);
                columnToUpdate.cardOrderIds.push(createdCard.uuid);
            }
        }

        dispatch(updateBoardData(newBoard));

        setOpenNewCardForm((prev) => !prev);
        setNewCardTitle('');
    };

    const handleDeleteColumn = () => {
        confirm({
            title: 'Delete Column?',
            description: 'This action permanently delete your Column and its Cards! Are you sure?',
            confirmationButtonProps: {
                color: 'warning',
            },
        })
            .then(() => {
                const newBoard = { ...board };

                newBoard.columns = newBoard.columns.filter((col) => col.id !== column.id);
                newBoard.columnOrderIds = newBoard.columnOrderIds.filter((colId) => colId !== column.uuid);

                dispatch(updateBoardData(newBoard));

                columnService.deleteColumn(column.id);
            })
            .catch(() => {});
    };

    // todo: Su kien menu
    // const handleClickMenu = () => {
    //     ///
    // };

    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            <Box
                sx={{
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : theme.palette.common.white),
                    borderRadius: '6px',
                    maxWidth: '300px',
                    minWidth: '300px',
                    height: 'fit-content',
                    maxHeight: (theme) => `calc(${theme.app.boardContentHeight} - ${theme.spacing(5)})`,
                    ml: 2,
                    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
                }}
                {...listeners}
            >
                <Header column={column} setOpenNewCardForm={setOpenNewCardForm} onDeleteColumn={handleDeleteColumn} />

                {/* Box List Card */}
                <SortableContext items={column?.cards?.map((c) => c.uuid) || []} strategy={verticalListSortingStrategy}>
                    <Box
                        sx={{
                            p: 0.5,
                            m: '0 5px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5,
                            overflowX: 'hidden',
                            overflowY: 'auto',
                            maxHeight: (theme) =>
                                `calc(${theme.app.boardContentHeight} - ${theme.spacing(5)} - ${
                                    theme.app.columnHeaderHeight
                                } - ${theme.app.columnFooterHeight})`,
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#ced0da',

                                '&:hover': {
                                    backgroundColor: '#bfc2cf',
                                },
                            },
                        }}
                    >
                        {/* List cards */}
                        {column?.cards?.length > 0 && column?.cards?.map((card) => <Card key={card.id} card={card} />)}
                    </Box>
                </SortableContext>

                {/* Box Column Footer */}
                <Footer
                    newCardTitle={newCardTitle}
                    openNewCardForm={openNewCardForm}
                    onChangeCardTitle={(e) => setNewCardTitle(e.target.value)}
                    onAddNewCard={handleAddNewCard}
                    onCloseCardForm={() => {
                        setOpenNewCardForm((prev) => !prev);
                        setNewCardTitle('');
                    }}
                />
            </Box>
        </div>
    );
}

Column.propTypes = {
    column: PropTypes.object,
};

export default Column;
