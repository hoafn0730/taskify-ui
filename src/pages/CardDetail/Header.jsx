import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { useDispatch } from 'react-redux';
import { updateCard } from '~/store/actions/boardAction';

function Header({ title = '', image, columnTitle, card }) {
    const [cardTitleValue, setCardTitleValue] = useState(title);
    const debouncedSearchTerm = useDebounce(cardTitleValue, 800);
    const dispatch = useDispatch();

    useEffect(() => {
        setCardTitleValue(title);
    }, [title]);

    useEffect(() => {
        if (!debouncedSearchTerm?.trim()) {
            return;
        }
        const updateData = { title: debouncedSearchTerm?.trim() };

        if (updateData.title !== title) {
            dispatch(updateCard({ columnId: card.columnId, cardId: card.id, data: updateData }));
        }
    }, [debouncedSearchTerm]);

    const handleUpdateTitle = (e) => {
        setCardTitleValue(e.target.value);
    };

    return (
        <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {image && (
                    <Box
                        component="img"
                        sx={{
                            height: '100%',
                            width: 350,
                            maxHeight: { xs: 233, md: 167 },
                            maxWidth: { xs: 350, md: 250 },
                            objectFit: 'contain',
                        }}
                        alt={title}
                        src={image.fileUrl}
                    />
                )}
            </Box>
            <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CreditCardIcon />

                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: '1.1rem',
                            p: '6px 10px',
                            height: '37px',
                            lineHeight: '1.4375em',
                            letterSpacing: '0.00938em',
                            display: 'none',
                        }}
                    >
                        {cardTitleValue}
                    </Typography>
                    <TextField
                        value={cardTitleValue}
                        id="filled-multiline-flexible"
                        multiline
                        maxRows={4}
                        variant="outlined"
                        sx={{
                            width: '100%',
                            mr: 6,

                            '& .MuiOutlinedInput-root': {
                                p: 0,
                                fontSize: '1.1rem',
                                width: '100%',

                                '& fieldset': {
                                    borderWidth: '0 !important',
                                },
                                '&:hover fieldset': {
                                    borderWidth: '0 !important',
                                },
                                '&.Mui-focused fieldset': {
                                    borderWidth: '1px !important',
                                },
                            },
                            '& .MuiOutlinedInput-input': {
                                p: '6px 10px',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {},
                        }}
                        onChange={handleUpdateTitle}
                    />
                </Box>
                <Typography variant="span" sx={{ fontSize: '14px', ml: '44px' }}>
                    in list {columnTitle}
                </Typography>
            </Box>
        </Box>
    );
}

Header.propTypes = {
    title: PropTypes.string,
    image: PropTypes.object,
    columnTitle: PropTypes.string,
    card: PropTypes.object,
};

export default Header;
