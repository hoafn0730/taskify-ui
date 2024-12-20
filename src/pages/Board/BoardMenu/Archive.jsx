import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { formatDistanceToNow } from 'date-fns';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { cardService } from '~/services/cardService';
import { Typography } from '@mui/material';

function Archive() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        cardService.getCards().then((res) => {
            const tasklist = res.data.filter((card) => card.archivedAt);
            setCards(tasklist);
        });
    }, []);

    const handleRestore = (cardId) => {
        // call api
        cardService.updateCard(cardId, {
            archivedAt: null,
        });

        //* update lai board

        setCards((prev) => prev.filter((item) => item.id !== cardId));
    };

    const handleDelete = (cardId) => {
        // call api
        cardService.deleteCard(cardId);

        setCards((prev) => prev.filter((item) => item.id !== cardId));
    };

    return (
        <Box sx={{ p: 1, width: '100%' }}>
            <List sx={{ display: 'flex', flexDirection: 'column' }}>
                {cards.length > 0 &&
                    cards.map((item, index) => (
                        <ListItem
                            key={index}
                            disablePadding
                            sx={{ flexDirection: 'column', alignItems: 'flex-start', mb: 1 }}
                        >
                            <ListItemText
                                primary={item.title}
                                secondary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                        <Inventory2OutlinedIcon fontSize="small" />
                                        {formatDistanceToNow(dayjs(item.archivedAt), { addSuffix: true })}
                                    </Box>
                                }
                                sx={{
                                    p: 1,
                                    borderRadius: 1,
                                    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                                    border: '1px solid rgba(0, 0, 0, 0.2)',
                                    width: '100%',
                                }}
                            />
                            <Box sx={{ display: 'flex' }}>
                                <ListItemButton
                                    sx={{ '&:hover': { textDecoration: 'underline' }, borderRadius: 1 }}
                                    onClick={() => handleRestore(item.id)}
                                >
                                    Restore
                                </ListItemButton>
                                <ListItemButton
                                    sx={{ '&:hover': { textDecoration: 'underline' }, borderRadius: 1 }}
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </ListItemButton>
                            </Box>
                        </ListItem>
                    ))}

                {!cards.length && <Typography variant="span">No archived items</Typography>}
            </List>
        </Box>
    );
}

export default Archive;
