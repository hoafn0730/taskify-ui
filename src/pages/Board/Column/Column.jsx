import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { useConfirm } from 'material-ui-confirm';

import Footer from './Footer';
import Header from './Header';
import Card from '../Card';
import { useDispatch } from 'react-redux';
import { deleteColumn } from '~/store/actions/boardAction';

function Column({ title, cards, data }) {
    const [openNewCardForm, setOpenNewCardForm] = useState(false);
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: data?.uuid,
        data: { ...data },
    });
    const confirm = useConfirm();
    const dispatch = useDispatch();

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        height: '100%',
        opacity: isDragging ? 0.5 : undefined,
    };

    const handleDeleteColumn = () => {
        confirm({
            title: 'Delete Column?',
            description: 'This action permanently delete your Column and its Cards! Are you sure?',
        })
            .then(() => {
                dispatch(deleteColumn({ columnId: data.id }));
            })
            .catch(() => {});
    };

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
                <Header
                    title={title}
                    openNewCardForm={openNewCardForm}
                    data={data}
                    setOpenNewCardForm={setOpenNewCardForm}
                    onDeleteColumn={handleDeleteColumn}
                />

                {/* Box List Card */}
                <SortableContext items={cards.map((c) => c.uuid)} strategy={verticalListSortingStrategy}>
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
                        {cards.map((card) => (
                            <Card
                                key={card.id}
                                title={card.title}
                                image={card.image}
                                memberIds={card.memberIds}
                                comments={card.comments}
                                attachments={card.attachments}
                                data={card}
                            />
                        ))}
                    </Box>
                </SortableContext>

                {/* Box Column Footer */}
                <Footer columnId={data?.id} openNewCardForm={openNewCardForm} setOpenNewCardForm={setOpenNewCardForm} />
            </Box>
        </div>
    );
}

Column.propTypes = {
    title: PropTypes.string,
    cards: PropTypes.array,
    data: PropTypes.object,
};

export default Column;
