import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Column from './Column';

function BoardContent({ data }) {
    return (
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
                {/* List Column */}
                {data.columns.map((col) => (
                    <Column key={col.id} title={col.title} cards={col.cards} />
                ))}
            </Box>
        </Box>
    );
}

BoardContent.propTypes = {
    data: PropTypes.object,
};
export default BoardContent;
