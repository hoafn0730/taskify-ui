import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Slider from '@mui/material/Slider';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function Checklist() {
    const [value, setValue] = useState(0);

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="span">{value}%</Typography>
                <Slider
                    sx={{
                        '& .MuiSlider-thumb': {
                            height: 0,
                            width: 0,

                            '&::after': {
                                height: 0,
                                width: 0,
                            },
                        },
                        '& .MuiSlider-thumb:is(:hover, .Mui-active)': {
                            display: 'none',
                        },
                        '& .MuiSlider-track': {
                            borderWidth: 0,
                        },
                    }}
                    value={value}
                    valueLabelDisplay="auto"
                />
            </Box>
            <List>
                <ListItem
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 0,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox onChange={(e) => setValue((prev) => (e.target.checked ? prev + 50 : prev - 50))} />
                        <ListItemText>Item 3</ListItemText>
                    </Box>
                    <Button sx={{ p: 0.5, minWidth: 'auto', borderRadius: '50%' }}>
                        <MoreHorizIcon />
                    </Button>
                </ListItem>
                <ListItem
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 0,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox onChange={(e) => setValue((prev) => (e.target.checked ? prev + 50 : prev - 50))} />
                        <ListItemText>Item 3</ListItemText>
                    </Box>
                    <Button sx={{ p: 0.5, minWidth: 'auto', borderRadius: '50%' }}>
                        <MoreHorizIcon />
                    </Button>
                </ListItem>
            </List>
        </Box>
    );
}

export default Checklist;
