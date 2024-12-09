import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { cardService } from '~/services/cardService';
import dayjs from 'dayjs';

function Archive() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        cardService.getCards().then((res) => {
            const tasklist = res.data.filter((card) => card.archivedAt);
            setCards(tasklist);
        });
    }, []);

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
                                secondary={dayjs(item.archivedAt).format('MMM D, h:mm A')}
                                sx={{
                                    p: 1,
                                    borderRadius: 1,
                                    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                                    border: '1px solid rgba(0, 0, 0, 0.2)',
                                    width: '100%',
                                }}
                            />
                            <Box sx={{ display: 'flex' }}>
                                <ListItemButton>Restore</ListItemButton>
                                <ListItemButton>Delete</ListItemButton>
                            </Box>
                        </ListItem>
                    ))}
            </List>
        </Box>
    );
}

export default Archive;
