import { useEffect, useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Slider from '@mui/material/Slider';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PropTypes from 'prop-types';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { checklistService } from '~/services/checklistService';

function Checklist({ checklist, checkItems = [] }) {
    const [listCheckItems, setListCheckItems] = useState(checkItems);
    const [itemValue, setItemValue] = useState('');
    const [addAnItem, setAddAnItem] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const onePercent = useMemo(() => (1 / listCheckItems?.length) * 100, [listCheckItems]);
    const percent = useMemo(
        () => (listCheckItems.filter((item) => item.status === 'complete').length / listCheckItems?.length) * 100 || 0,
        [listCheckItems],
    );
    const [value, setValue] = useState(percent);
    const [itemId, setItemId] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        setValue(percent);
    }, [percent]);

    const handleCheck = (e, item) => {
        checklistService.updateCheckItem(checklist.id, item.id, {
            status: e.target.checked ? 'complete' : 'incomplete',
        });

        item.status = item.status === 'complete' ? 'incomplete' : 'complete';

        setValue((prev) => (e.target.checked ? prev + onePercent : prev - onePercent));
    };

    const handleAddNewItem = () => {
        if (!itemValue.trim()) return;

        console.log(itemValue);

        const itemClone = {
            title: itemValue,
            status: 'incomplete',
        };

        checklistService
            .createNewCheckItem(checklist.id, itemClone)
            .then((res) => {
                setListCheckItems((prev) => [...prev, res]);
                inputRef.current.focus();
                setItemValue('');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDeleteItem = () => {
        checklistService.deleteCheckItem(checklist.id, itemId);

        const newListCheckItems = listCheckItems.filter((item) => item.id !== itemId);
        setListCheckItems(newListCheckItems);
        setItemId(null);
        setAnchorEl(null);
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
                {listCheckItems?.length > 0 &&
                    listCheckItems.map((item, index) => (
                        <ListItem
                            key={index}
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
                            <Button
                                sx={{ p: 0.5, minWidth: 'auto', borderRadius: '50%' }}
                                onClick={(event) => {
                                    setAnchorEl(event.currentTarget);
                                    setItemId(item.id);
                                }}
                            >
                                <MoreHorizIcon />
                            </Button>
                        </ListItem>
                    ))}

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem
                        sx={{
                            '&:hover': {
                                color: 'warning.dark',
                                '& .delete-icon': {
                                    color: 'warning.dark',
                                },
                            },
                        }}
                        onClick={handleDeleteItem}
                    >
                        <ListItemIcon>
                            <DeleteForeverIcon className="delete-icon" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                    </MenuItem>
                </Menu>
            </List>

            {addAnItem ? (
                <Box sx={{ ml: 5 }}>
                    <TextField
                        inputRef={inputRef}
                        value={itemValue}
                        data-no-dnd={true}
                        variant="outlined"
                        placeholder="Add an item"
                        sx={{
                            mb: 1,
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                                p: 0,
                                fontSize: '1.1rem',
                                width: '100%',
                            },
                            '& .MuiOutlinedInput-input': {
                                fontSize: '14px',
                                p: '8px 16px',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {},
                        }}
                        onChange={(e) => setItemValue(e.target.value)}
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button variant="contained" onClick={handleAddNewItem}>
                            Add
                        </Button>
                        <Button onClick={() => setAddAnItem(false)}>Cancel</Button>
                    </Box>
                </Box>
            ) : (
                <Button variant="outlined" sx={{ ml: 5 }} onClick={() => setAddAnItem(true)}>
                    Add an item
                </Button>
            )}
        </Box>
    );
}

Checklist.propTypes = {
    checklist: PropTypes.object,
    checkItems: PropTypes.array,
};
export default Checklist;
