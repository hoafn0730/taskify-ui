import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import ContentCut from '@mui/icons-material/ContentCut';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import AddCard from '@mui/icons-material/AddCard';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { useDebounce } from '@uidotdev/usehooks';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';

import { updateBoardData } from '~/store/slices/boardSlice';
import { columnService } from '~/services/columnService';

// import { useTranslation } from 'react-i18next';

function Header({ column, setOpenNewCardForm, onDeleteColumn }) {
    // const { t } = useTranslation('board');
    const board = useSelector((state) => state.board.activeBoard);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isRename, setIsRename] = useState(false);
    const [columnTitleValue, setColumnTitleValue] = useState(column?.title);
    const debouncedColumnTitleValue = useDebounce(columnTitleValue, 800);
    const dispatch = useDispatch();

    const open = Boolean(anchorEl);

    useEffect(() => {
        if (!debouncedColumnTitleValue?.trim()) {
            return;
        }

        const updateData = { title: debouncedColumnTitleValue?.trim() };

        if (updateData.title !== column?.title) {
            const newBoard = cloneDeep(board);

            const activeColumn = newBoard.columns.find((col) => col.id === column.id);
            Object.assign(activeColumn, updateData);

            dispatch(updateBoardData(newBoard));

            columnService.updateColumn(column.id, updateData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedColumnTitleValue, dispatch]);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <Box
            sx={{
                height: (theme) => theme.app.columnHeaderHeight,
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            {!isRename ? (
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                    }}
                >
                    {column?.title}
                </Typography>
            ) : (
                <TextField
                    value={columnTitleValue}
                    autoFocus
                    data-no-dnd={true}
                    maxRows={4}
                    variant="outlined"
                    sx={{
                        width: '100%',
                        ml: '-6px',
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
                            fontWeight: '700',
                            fontSize: '1rem',
                            p: '6px 6px',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {},
                    }}
                    onChange={(e) => setColumnTitleValue(e.target.value)}
                    onBlur={() => setIsRename(false)}
                />
            )}

            <Box>
                <Tooltip title="More options">
                    <ExpandMoreIcon
                        sx={{
                            color: 'text.primary',
                            cursor: 'pointer',
                        }}
                        id="basic-column-dropdown"
                        aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    />
                </Tooltip>
                <Menu
                    id="basic-menu-column-dropdown"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    disableEnforceFocus
                    disableRestoreFocus
                    MenuListProps={{
                        'aria-labelledby': 'basic-column-dropdown',
                    }}
                >
                    <MenuItem onClick={() => setOpenNewCardForm(true)}>
                        <ListItemIcon>
                            <AddCard fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Add new card</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                            ⌘N
                        </Typography>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <ContentCut fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Cut</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                            ⌘X
                        </Typography>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <ContentCopy fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Copy</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                            ⌘C
                        </Typography>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <ContentPaste fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Paste</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                            ⌘V
                        </Typography>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            setIsRename(true);
                        }}
                    >
                        <ListItemIcon>
                            <DriveFileRenameOutlineIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Rename</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                            ⌘V
                        </Typography>
                    </MenuItem>

                    <Divider />
                    <MenuItem
                        sx={{
                            '&:hover': {
                                color: 'warning.dark',
                                '& .delete-icon': {
                                    color: 'warning.dark',
                                },
                            },
                        }}
                        onClick={onDeleteColumn}
                    >
                        <ListItemIcon>
                            <DeleteForeverIcon className="delete-icon" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Remove this column</ListItemText>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <CloudOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Archive this column</ListItemText>
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );
}

Header.propTypes = {
    column: PropTypes.object,
    setOpenNewCardForm: PropTypes.func,
    onDeleteColumn: PropTypes.func,
};

export default Header;
