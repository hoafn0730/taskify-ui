import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Slider from '@mui/material/Slider';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PropTypes from 'prop-types';
import { checklistService } from '~/services/checklistService';

function Checklist({ checklist, checkItems = [] }) {
    const onePercent = useMemo(() => (1 / checkItems?.length) * 100, [checkItems]);
    const percent = useMemo(
        () => (checkItems.filter((item) => item.status === 'complete').length / checkItems?.length) * 100 || 0,
        [checkItems],
    );
    const [value, setValue] = useState(percent);

    const handleCheck = (e, item) => {
        checklistService.updateCheckItem(checklist.id, item.id, {
            status: e.target.checked ? 'complete' : 'incomplete',
        });

        item.status = item.status === 'complete' ? 'incomplete' : 'complete';

        setValue((prev) => (e.target.checked ? prev + onePercent : prev - onePercent));
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="span">{Math.round(value)}%</Typography>
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
                    value={Math.round(value)}
                    valueLabelDisplay="auto"
                />
            </Box>
            <List>
                {checkItems?.length > 0 &&
                    checkItems.map((item) => (
                        <ListItem
                            key={item.id}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                p: 0,
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox checked={item.status === 'complete'} onChange={(e) => handleCheck(e, item)} />
                                <ListItemText
                                    sx={{
                                        textDecoration: item.status === 'complete' ? 'line-through' : 'none',
                                    }}
                                >
                                    {item.title}
                                </ListItemText>
                            </Box>
                            <Button sx={{ p: 0.5, minWidth: 'auto', borderRadius: '50%' }}>
                                <MoreHorizIcon />
                            </Button>
                        </ListItem>
                    ))}
            </List>
        </Box>
    );
}

Checklist.propTypes = {
    checklist: PropTypes.object,
    checkItems: PropTypes.array,
};
export default Checklist;
