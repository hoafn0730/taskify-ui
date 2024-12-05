import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { useDispatch } from 'react-redux';
import { cloneDeep } from 'lodash';
import { cardService } from '~/services/cardService';
import { updateCardOnBoard } from '~/store/slices/boardSlice';
import { updateCardData } from '~/store/slices/cardSlice';
import slugify from 'slugify';
import { useLocation, useNavigate } from 'react-router-dom';

function Header({ card }) {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cardTitleValue, setCardTitleValue] = useState(card?.title);
    const debouncedSearchTerm = useDebounce(cardTitleValue, 800);

    useEffect(() => {
        setCardTitleValue(card?.title);
    }, [card?.title]);

    useEffect(() => {
        if (!debouncedSearchTerm?.trim()) {
            return;
        }
        const updateData = { title: debouncedSearchTerm?.trim() };

        if (updateData.title !== card?.title) {
            const newCard = cloneDeep(card);
            newCard.title = updateData.title;
            newCard.slug = slugify(updateData.title, { lower: true });
            navigate('/card/' + slugify(updateData.title, { lower: true }), {
                state: { backgroundLocation: location.state.backgroundLocation },
                replace: true,
            });

            dispatch(updateCardOnBoard(newCard));
            dispatch(updateCardData(newCard));

            cardService.updateCard(card?.id, updateData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm, dispatch]);

    const handleUpdateTitle = (e) => {
        setCardTitleValue(e.target.value);
    };

    return (
        <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {card?.cover && (
                    <Box
                        component="img"
                        sx={{
                            height: '100%',
                            width: 350,
                            maxHeight: { xs: 233, md: 167 },
                            maxWidth: { xs: 350, md: 250 },
                            objectFit: 'contain',
                        }}
                        alt={card?.title}
                        src={card?.cover.fileUrl}
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
                    in list {card?.column?.title}
                </Typography>
            </Box>
        </Box>
    );
}

Header.propTypes = {
    card: PropTypes.object,
};

export default Header;
