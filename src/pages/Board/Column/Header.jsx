import PropTypes from 'prop-types';
import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddCard from '@mui/icons-material/AddCard';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

import Menu from '~/components/Menu';
import { columnService } from '~/services/columnService';
import { updateBoardData } from '~/store/slices/boardSlice';

// import { useTranslation } from 'react-i18next';

function Header({ column, setOpenNewCardForm, onDeleteColumn }) {
    // const { t } = useTranslation('board');
    const board = useSelector((state) => state.board.activeBoard);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isRename, setIsRename] = useState(false);
    const [columnTitleValue, setColumnTitleValue] = useState(column?.title);
    const debouncedColumnTitleValue = useDebounce(columnTitleValue, 800);
    const dispatch = useDispatch();

    const columnMenu = [
        {
            title: 'Add new card',
            icon: <AddCard fontSize="small" />,
            type: 'addNewCard',
        },
        {
            title: 'Cut',
            icon: <ContentCut fontSize="small" />,
            type: 'cut',
        },
        {
            title: 'Copy',
            icon: <ContentCopy fontSize="small" />,
            type: 'copy',
        },
        {
            title: 'Paste',
            icon: <ContentPaste fontSize="small" />,
            type: 'paste',
        },
        {
            title: 'Rename',
            icon: <DriveFileRenameOutlineIcon fontSize="small" />,
            type: 'rename',
        },
        {
            title: 'Remove this column',
            icon: <DeleteForeverIcon fontSize="small" />,
            type: 'removeColumn',
        },
    ];

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

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'addNewCard':
                setAnchorEl(null);
                setOpenNewCardForm(true);
                break;
            case 'rename':
                setIsRename(true);
                break;
            case 'removeColumn':
                onDeleteColumn();
                break;

            default:
        }
    };

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
                <Menu anchorEl={anchorEl} items={columnMenu} onChange={handleMenuChange} onClose={handleClose} />
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
