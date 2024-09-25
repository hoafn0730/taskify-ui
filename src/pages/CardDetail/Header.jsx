import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useState } from 'react';

function Header() {
    const [cardTitleValue, setCardTitleValue] = useState('--- Discuss During Next Meeting ---');

    return (
        <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box
                    component="img"
                    sx={{
                        height: '100%',
                        width: 350,
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 },
                        objectFit: 'contain',
                    }}
                    alt="The house from the offer."
                    src="https://trello.com/1/cards/66c7227e1b6610ae2170f0de/attachments/66ec35f39526b220db751ebd/previews/66ec35f39526b220db751ec7/download/images.jpg"
                    // src="https://trello.com/1/cards/66c7227e1b6610ae2170f0da/attachments/66c7227e1b6610ae2170f25d/previews/66c7227e1b6610ae2170f262/download/giphy.gif"
                />
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
                        --- Discuss During Next Meeting ---
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
                        onChange={(e) => setCardTitleValue(e.target.value)}
                    />
                </Box>
                <Typography variant="span" sx={{ fontSize: '14px', ml: '44px' }}>
                    in list This Week 1
                </Typography>
            </Box>
        </Box>
    );
}

export default Header;
