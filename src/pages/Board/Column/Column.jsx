import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import Footer from './Footer';
import Header from './Header';
import Card from '../Card';

function Column({ title, cards, data }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: data?.uuid,
        data: { ...data },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        height: '100%',
        opacity: isDragging ? 0.5 : undefined,
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
                <Header title={title} />

                {/* Box List Card */}
                <SortableContext items={cards.map((c) => c.uuid)} strategy={verticalListSortingStrategy}>
                    <Box
                        sx={{
                            p: 0.5,
                            m: '0 5px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
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
                                desc={card.description}
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
                <Footer />
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
